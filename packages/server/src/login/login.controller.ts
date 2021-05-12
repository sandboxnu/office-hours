import {
  KhouryDataParams,
  KhouryRedirectResponse,
  OAuthAccessTokensRequest,
  OAuthAccessTokensResponse,
  RefreshToken,
  AccessToken,
  ERROR_MESSAGES,
  OAuthTACourseModel,
  OAuthUserModel,
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
import { request } from 'http';

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
    const token = axios
      .post(
        `http://localhost:8000/api/oauth/token?client_id=f7af86112c35ba004b25&client_secret=ZJMPI4JXIJRSOG4D&grant_type=authorization_code&redirect_uri=http://localhost:3000/oauth&code=${authCode}&scopes=user.info&scopes=ta.info&scopes=student.courses&verifier=${challenge}`,
      )
      .then((token) => {
        const tokens = {
          access: token.data.access,
          refresh: token.data.refresh,
        };
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
    const token = axios
      .get(
        `http://localhost:8000/api/oauth/token/refresh?client_id=f7af86112c35ba004b25&client_secret=ZJMPI4JXIJRSOG4D&refresh_token=${refreshToken}&grant_type=refresh_token&scopes=user.info&scopes=ta.info&scopes=student.courses`,
      )
      .then((token) => {
        const tokens = {
          access: token.data.access,
        };
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
  ): Promise<void> {
    let authorizationToken = 'Bearer ' + body.access;
    let request;
    try {
      request = await axios.get(
        `http://localhost:8000/api/oauth/userinfo/read/`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        },
      );
    } catch (err) {
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
      // Return a student's list of courses
    }

    // gets the logging in student list of courses they TA if they are a TA
    khouryData.ta_courses = await this.getTACourses(authorizationToken);

    let user;
    try {
      user = await this.loginCourseService.addUserFromKhoury(khouryData);
    } catch (e) {
      Sentry.captureException(e);
      console.error(
        'Khoury login threw an exception, the body was ',
        khouryData,
      );
      throw e;
    }
    this.createUserToken(user.id, res);
  }

  // TODO: Remove this endpoint
  @Post('/khoury_login')
  async recieveDataFromKhoury(
    @Req() req: Request,
    @Body() body: KhouryDataParams,
  ): Promise<KhouryRedirectResponse> {
    if (process.env.NODE_ENV === 'production') {
      // Check that request has come from Khoury
      const parsedRequest = httpSignature.parseRequest(req);
      const verifySignature = httpSignature.verifyHMAC(
        parsedRequest,
        this.configService.get('KHOURY_PRIVATE_KEY'),
      );
      if (!verifySignature) {
        Sentry.captureMessage('Invalid request signature: ' + parsedRequest);
        throw new UnauthorizedException('Invalid request signature');
      }
    }

    let user;
    try {
      user = await this.loginCourseService.addUserFromKhoury(body);
    } catch (e) {
      Sentry.captureException(e);
      console.error('Khoury login threw an exception, the body was ', body);
      throw e;
    }

    // Create temporary login token to send user to.
    const token = await this.jwtService.signAsync(
      { userId: user.id },
      { expiresIn: 60 },
    );
    return {
      redirect:
        this.configService.get('DOMAIN') + `/api/v1/login/entry?token=${token}`,
    };
  }

  // TODO: Remove this endpoint
  // NOTE: Although the two routes below are on the backend,
  // they are meant to be visited by the browser so a cookie can be set

  // This is the real admin entry point
  @Get('/login/entry')
  async enterFromKhoury(
    @Res() res: Response,
    @Query('token') token: string,
  ): Promise<void> {
    const isVerified = await this.jwtService.verifyAsync(token);

    if (!isVerified) {
      throw new UnauthorizedException();
    }

    const payload = this.jwtService.decode(token) as { userId: number };

    this.enter(res, payload.userId);
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

  private async getStudentCourses(accessToken: string) {
    // TODO: Make a request to get the logged in user's courses
  }

  private async getTACourses(
    accessToken: string,
  ): Promise<OAuthTACourseModel[]> {
    let taRequest;

    let courses = [];
    // Get the logging in user's ta courses if they are a TA. I think either an instructor or student can have this?
    try {
      taRequest = await axios.get(
        `http://localhost:8000/api/oauth/tainfo/read/`,
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
        console.log(course);
        courses.push({
          course: course.course,
          semester: course.semester,
          campus: course.campus,
        });
      }
    }
    console.log(courses);
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
}
