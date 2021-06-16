import {
  KhouryDataParams,
  OAuthAccessTokensRequest,
  OAuthAccessTokensResponse,
  RefreshToken,
  AccessToken,
  ERROR_MESSAGES,
  KhouryTACourse,
  KHOURY_ADMIN_OAUTH_API_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URI,
  OAUTH_SCOPES,
  GetSelfEnrollResponse,
  Role,
} from '@koh/common';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as Sentry from '@sentry/node';
import { CourseModel } from 'course/course.entity';
import { User } from 'decorators/user.decorator';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import * as httpSignature from 'http-signature';
import { UserCourseModel } from 'profile/user-course.entity';
import { UserModel } from 'profile/user.entity';
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
        `${KHOURY_ADMIN_OAUTH_API_URL}/token?
        client_id=${OAUTH_CLIENT_ID}
        &client_secret=${OAUTH_CLIENT_SECRET}
        &grant_type=authorization_code
        &redirect_uri=${OAUTH_REDIRECT_URI}
        &code=${authCode}
        &${OAUTH_SCOPES}
        &verifier=${challenge}`,
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
      .catch((e) => {
        console.error(e);
        Sentry.captureException(
          'Error while getting Access and Refresh tokens: ' + e,
        );
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
    `${KHOURY_ADMIN_OAUTH_API_URL}/token/refresh?
      client_id=${OAUTH_CLIENT_ID}
      &refresh_token=${refreshToken}
      &client_secret=${OAUTH_CLIENT_SECRET}
      &grant_type=refresh_token
      &redirect_uri=${OAUTH_REDIRECT_URI}
      &${OAUTH_SCOPES}`;

    const token = axios
      .get(
        `${KHOURY_ADMIN_OAUTH_API_URL}/token/refresh?
        client_id=${OAUTH_CLIENT_ID}
        &refresh_token=${refreshToken}
        &client_secret=${OAUTH_CLIENT_SECRET}
        &grant_type=refresh_token
        &redirect_uri=${OAUTH_REDIRECT_URI}
        &${OAUTH_SCOPES}`,
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
      .catch((e) => {
        console.error(e);
        Sentry.captureException('Error while getting Refresh token: ' + e);
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
      console.error(
        'Error while retrieving user data from Khoury server: ' + err,
      );
      Sentry.captureException(
        'Error while retrieving user data from Khoury server: ' + err,
      );
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
      khouryData.courses = await this.getCourses(authorizationToken);
      // Get the courses the singing in student TA's for
      khouryData.ta_courses = await this.getTACourses(
        authorizationToken,
        `/tainfo/read/`,
        true,
      );

      // An instructor is signing in, get an instructor's courses and map it as the khoury Data TA courses
    } else if (khouryData.accountType.includes('faculty')) {
      khouryData.ta_courses = await this.getTACourses(
        authorizationToken,
        '/instructorcourses/read/',
        false,
      );
    }

    this.signInToOfficeHoursUser(khouryData)
      .then((id) => {
        this.createUserToken(id, res);
      })
      .catch((err) => {
        console.error('Error while signing user in: ' + err);
        Sentry.captureException('Error while signing user in: ' + err);
        throw new HttpException(
          ERROR_MESSAGES.loginController.officeHourUserDataError,
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  private async getCourses(accessToken: string) {
    let request;
    let courses = [];
    try {
      request = await axios.get(
        KHOURY_ADMIN_OAUTH_API_URL + '/studentcourses/read/',
        {
          headers: {
            Authorization: accessToken,
          },
        },
      );
    } catch (err) {
      console.error("Error while getting a student's courses: " + err);
      Sentry.captureException(
        "Error while getting a student's courses: " + err,
      );
      throw new HttpException(
        ERROR_MESSAGES.loginController.unableToGetStudentCourses,
        HttpStatus.BAD_REQUEST,
      );
    }
    for (const course of request.data.courses) {
      courses.push({
        course: course.course,
        semester: course.semester,
        campus: course.campus,
        section: course.section,
        crn: course.crn,
        title: course.title,
        accelerated: course.accelerated,
      });
    }
    return courses;
  }

  private async getTACourses(
    accessToken: string,
    url: string,
    isStudent: boolean,
  ): Promise<KhouryTACourse[]> {
    let request;
    let courses = [];
    // Get the logging in user's ta courses if they are a TA. I think either an instructor or student can have this?
    try {
      request = await axios.get(KHOURY_ADMIN_OAUTH_API_URL + url, {
        headers: {
          Authorization: accessToken,
        },
      });
    } catch (err) {
      console.error("Error while getting a TA's courses: " + err);
      Sentry.captureException("Error while getting a TA's courses: " + err);
      throw new HttpException(
        ERROR_MESSAGES.loginController.unableToGetTaInfo,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (isStudent) {
      /* 
      The 'request.data.is_ta' has to be a separate check because if the account is a student but they are not a TA we do nothing.
      If we did (isStudent && request.data.is_ta == true) then the above scenario would break as the code will go into the else clause
      which is meant for ONLY instructors because they do not have the .is_ta check.
      */
      if (request.data.is_ta === true) {
        for (const course of request.data.courses) {
          courses.push({
            course: course.course,
            semester: course.semester,
            campus: course.campus,
          });
        }
      }
    } else {
      for (const course of request.data.courses) {
        courses.push({
          course: course.course,
          semester: course.semester,
          campus: course.campus,
        });
      }
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
      console.error('Khoury login threw an exception, the body was ', data);
      console.error(e);
      Sentry.captureException(
        'Error while performing all the course mappings for the user: ' + e,
      );
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

  // Set cookie and redirect to proper page
  private async enter(res: Response, userId: number) {
    // Expires in 30 days
    const authToken = await this.jwtService.signAsync({
      userId,
      expiresIn: 60 * 60 * 24 * 30,
    });

    if (authToken === null || authToken === undefined) {
      console.error('Authroziation JWT is invalid');
      throw new HttpException(
        ERROR_MESSAGES.loginController.invalidTempJWTToken,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');
    res
      .cookie('auth_token', authToken, { httpOnly: true, secure: isSecure })
      .redirect(302, '/');
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

  @Get('self_enroll_courses')
  async selfEnrollEnabledAnywhere(): Promise<GetSelfEnrollResponse> {
    try {
      const courses = await CourseModel.find();
      return { courses: courses.filter((course) => course.selfEnroll) };
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.loginController.getUserCourseModel,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create_self_enroll_override/:id')
  @UseGuards(JwtAuthGuard)
  async createSelfEnrollOverride(
    @Param('id') courseId: number,
    @User() user: UserModel,
  ): Promise<void> {
    const course = await CourseModel.findOne(courseId);

    if (!course.selfEnroll) {
      throw new UnauthorizedException(
        'Cannot self-enroll to this course currently',
      );
    }

    const prevUCM = await UserCourseModel.findOne({
      where: {
        courseId,
        userId: user.id,
      },
    });

    if (prevUCM) {
      throw new BadRequestException(
        'User already has an override for this course',
      );
    }

    try {
      await UserCourseModel.create({
        userId: user.id,
        courseId: courseId,
        role: Role.STUDENT,
        override: true,
        expires: true,
      }).save();
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.loginController.saveUserCourseModel,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
