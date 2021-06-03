import {
  KhouryDataParams,
  KhouryRedirectResponse,
  OAuthAccessTokensRequest,
  OAuthAccessTokensResponse,
  RefreshToken,
  AccessToken,
  ERROR_MESSAGES,
  OAuthTACourseModel,
  KHOURY_ADMIN_OAUTH_API_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URI,
  OAUTH_SCOPES,
} from '@koh/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  HttpException,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as Sentry from '@sentry/node';
import { Request, Response } from 'express';
import * as httpSignature from 'http-signature';
import { Connection } from 'typeorm';
import { NonProductionGuard } from '../guards/non-production.guard';
import { LoginCourseService } from './login-course.service';
import axios from 'axios';

@Controller()
export class LoginController {
  constructor(
    private connection: Connection,
    private loginCourseService: LoginCourseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post('/oauth/tokens')
  async getAccessTokens(
    @Res() res: Response,
    @Body() body: OAuthAccessTokensRequest,
  ): Promise<OAuthAccessTokensResponse> {
    const authCode = body.code;
    const challenge = body.verifier;
    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');
    const token = axios
      .post(
        KHOURY_ADMIN_OAUTH_API_URL +
          '/token?client_id=' +
          OAUTH_CLIENT_ID +
          '&client_secret=' +
          OAUTH_CLIENT_SECRET +
          '&grant_type=authorization_code&redirect_uri=' +
          OAUTH_REDIRECT_URI +
          `&code=${authCode}&` +
          OAUTH_SCOPES +
          `&verifier=${challenge}`,
      )
      .then((token) => {
        const tokens = {
          access: token.data.access,
          refresh: token.data.refresh,
        };
        res.cookie('oauth_access', tokens.access, {
          httpOnly: true,
          secure: isSecure,
        });
        res.cookie('oauth_refresh', tokens.refresh, {
          httpOnly: true,
          secure: isSecure,
        });
        res.json(tokens);
        return tokens;
      })
      .catch(() => {
        throw new HttpException(
          ERROR_MESSAGES.loginController.unableToGetAccessToken,
          HttpStatus.BAD_REQUEST,
        );
      });
    return token;
  }

  @Post('/oauth/tokens/refresh')
  async refreshAccessTokens(
    @Res() res: Response,
    @Body() body: RefreshToken,
  ): Promise<AccessToken> {
    const refreshToken = body.refresh;
    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');
    const token = axios
      .get(
        KHOURY_ADMIN_OAUTH_API_URL +
          `/token/refresh?client_id=f7af86112c35ba004b25&client_secret=ZJMPI4JXIJRSOG4D&refresh_token=${refreshToken}&grant_type=refresh_token&scopes=user.info&scopes=ta.info&scopes=student.courses`,
      )
      .then((token) => {
        const tokens = {
          access: token.data.access,
        };
        res.cookie('oauth_access', tokens.access, {
          httpOnly: true,
          secure: isSecure,
        });
        res.json(tokens);
        return tokens;
      })
      .catch(() => {
        throw new HttpException(
          ERROR_MESSAGES.loginController.unabletoRefreshAccessToken,
          HttpStatus.BAD_REQUEST,
        );
      });
    return token;
  }

  @Post('/oauth/user')
  async getUser(
    @Res() res: Response,
    @Body() body: AccessToken,
    @Req() req: Request,
  ): Promise<void> {
    let authorizationToken = 'Bearer ' + body.access;
    let request;
    try {
      request = await axios.get(
        KHOURY_ADMIN_OAUTH_API_URL + `/userinfo/read/`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        },
      );
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.loginController.unabletToGetUserInfo,
        HttpStatus.BAD_REQUEST,
      );
    }

    let khouryData = {
      first_name: request.data.firstname,
      last_name: request.data.lastname,
      email: request.data.email,
      accountType: request.data.account_type,
      campus: request.data.campus,
      ta_courses: [],
      courses: [],
      photo_url: '',
    };

    // this is a student signing in so get the students list of courses
    if (khouryData.accountType.includes('student')) {
      console.log("Getting student's list of courses");
      khouryData.courses = await this.getStudentCourses(authorizationToken);
      khouryData.ta_courses = await this.getTACourses(authorizationToken);
      console.log('TA COURSES IS: ' + khouryData.ta_courses);
      console.log('STUDENT COURSES IS: ' + khouryData.courses);
      // Return a student's list of courses
    } else if (khouryData.accountType.includes('faculty')) {
      console.log("Getting instructor's list of courses");
      khouryData.ta_courses = await this.getInstructorCourses(
        authorizationToken,
      );
      console.log('INSTRUCTOR COURSES IS: ' + khouryData.ta_courses);
    }

    this.signInToOfficeHoursUser(khouryData)
      .then((id) => {
        this.createUserToken(id, res);
      })
      .catch(() => {
        throw new HttpException(
          ERROR_MESSAGES.loginController.officeHourUserDataError,
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  // Set cookie and redirect to proper page
  private async enter(res: Response, userId: number) {
    // Expires in 30 days
    const authToken = await this.jwtService.signAsync({
      userId,
      expiresIn: 60 * 60 * 24 * 30,
    });
    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');
    res
      .cookie('auth_token', authToken, { httpOnly: true, secure: isSecure })
      .redirect(302, '/');
  }

  private async getStudentCourses(accessToken: string) {
    let studentCourseRequest;
    let courses = [];
    // Get the logging in user's ta courses if they are a TA. I think either an instructor or student can have this?
    try {
      studentCourseRequest = await axios.get(
        KHOURY_ADMIN_OAUTH_API_URL + `/studentcourses/read/`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.loginController.unableToGetStudentCourses,
        HttpStatus.BAD_REQUEST,
      );
    }
    for (const course of studentCourseRequest.data[0].courses) {
      courses.push({
        course: course.course,
        semester: course.semester,
        campus: course.campus,
      });
    }
    return courses;
  }

  private async getTACourses(
    accessToken: string,
  ): Promise<OAuthTACourseModel[]> {
    let taRequest;
    let courses = [];
    // Get the logging in user's ta courses if they are a TA. I think either an instructor or student can have this?
    try {
      taRequest = await axios.get(
        KHOURY_ADMIN_OAUTH_API_URL + `/tainfo/read/`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
    } catch (err) {
      throw new HttpException(
        ERROR_MESSAGES.loginController.unableToGetTaInfo,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (taRequest.data.is_ta === true) {
      for (const course of taRequest.data.courses) {
        courses.push({
          course: course.course,
          semester: course.semester,
          campus: course.campus,
        });
      }
    }
    return courses;
  }

  private async getInstructorCourses(
    accessToken: string,
  ): Promise<OAuthTACourseModel[]> {
    let instructorRequest;
    let courses = [];
    // Get the logging in user's ta courses if they are a TA. I think either an instructor or student can have this?
    try {
      instructorRequest = await axios.get(
        KHOURY_ADMIN_OAUTH_API_URL + `/instructorcourses/read/`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
    } catch (err) {
      throw new HttpException(
        ERROR_MESSAGES.loginController.unableToGetInstructorCourses,
        HttpStatus.BAD_REQUEST,
      );
    }
    for (const course of instructorRequest.data.courses) {
      courses.push({
        course: course.course,
        semester: course.semester,
        campus: course.campus,
      });
    }
    return courses;
  }

  private async createUserToken(userId: string, res: Response) {
    // Create temporary login token to send user to.
    const token = await this.jwtService.signAsync(
      { userId: userId },
      { expiresIn: 60 },
    );
    const isVerified = await this.jwtService.verifyAsync(token);
    if (!isVerified) {
      throw new UnauthorizedException();
    }
    const payload = this.jwtService.decode(token) as { userId: number };
    this.enter(res, payload.userId);
  }

  private async signInToOfficeHoursUser(
    data: KhouryDataParams,
  ): Promise<string> {
    let user;
    try {
      user = await this.loginCourseService.addUserFromKhoury(data);
    } catch (e) {
      Sentry.captureException(e);
      console.error('Khoury login threw an exception, the body was ', data);
      throw e;
    }
    return user.id;
  }

  // This is for login on development only
  @Get('/login/dev')
  @UseGuards(NonProductionGuard)
  async enterFromDev(
    @Res() res: Response,
    @Query('userId') userId: number,
  ): Promise<void> {
    this.enter(res, userId);
  }

  @Get('/logout')
  async logout(@Res() res: Response): Promise<void> {
    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');
    res
      .clearCookie('auth_token', { httpOnly: true, secure: isSecure })
      .redirect(302, '/login');
  }
}
