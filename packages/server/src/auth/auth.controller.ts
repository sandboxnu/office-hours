import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { ERROR_MESSAGES } from '@koh/common';
import { JwtService } from '@nestjs/jwt';
import { OrganizationModel } from 'organization/organization.entity';

@Controller('auth')
export class AuthController {
  private GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Get('shibboleth/:oid')
  async shibbolethAuth(
    @Req() req: Request,
    @Res() res: Response,
    @Param('oid') organizationId: number,
  ): Promise<any> {
    const organization = await OrganizationModel.findOne({
      where: { id: organizationId },
    });

    if (!organization) {
      return res.redirect(`/auth/failed/40000`);
    }
    if (!organization.ssoEnabled) {
      return res.redirect(`/auth/failed/40002`);
    }

    const uid = req.headers['x-trust-auth-uid'] ?? null;
    const mail = req.headers['x-trust-auth-mail'] ?? null;
    const role = req.headers['x-trust-auth-role'] ?? null;
    const givenName = req.headers['x-trust-auth-givenname'] ?? null;
    const lastName = req.headers['x-trust-auth-lastname'] ?? null;

    if (!uid || !mail || !role || !givenName || !lastName) {
      return res.redirect(`/auth/failed/40001`);
    }

    try {
      const userId = await this.authService.loginWithShibboleth(
        String(mail),
        String(role),
        String(givenName),
        String(lastName),
        organizationId,
      );

      this.enter(res, userId);
    } catch (err) {
      return res.redirect(`/auth/failed/40001`);
    }
  }

  @Get('link/:method/:oid')
  auth(
    @Res() res: Response,
    @Param('method') auth_method: string,
    @Param('oid') organizationId: number,
  ): Response<{ redirectUri: string }> {
    res.cookie('organization.id', organizationId, {
      httpOnly: true,
      secure: this.isSecure(),
    });

    switch (auth_method) {
      case 'google':
        return res.status(200).send({
          redirectUri:
            `${this.GOOGLE_AUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}.apps.googleusercontent.com` +
            `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`,
        });
      default:
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Invalid auth method' });
    }
  }

  @Get('callback/:method')
  async callback(
    @Res() res: Response,
    @Param('method') auth_method: string,
    @Query('code') auth_code: string,
    @Req() req: Request,
  ): Promise<Response<void>> {
    const organizationId = this.getCookie(req, 'organization.id');

    if (!organizationId) {
      res.redirect(`/auth/failed/40000`);
    } else {
      try {
        let payload: number;

        switch (auth_method) {
          case 'google':
            payload = await this.authService.loginWithGoogle(
              auth_code,
              Number(organizationId),
            );
            break;
          default:
            return res
              .status(HttpStatus.BAD_REQUEST)
              .send({ message: 'Invalid auth method' });
        }

        res.clearCookie('organization.id', {
          httpOnly: true,
          secure: this.isSecure(),
        });

        this.enter(res, payload);
      } catch (err) {
        res.redirect(`/auth/failed/40001`);
      }
    }
  }

  private getCookie(req: Request, cookieName: string): string {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      return null;
    }

    const cookies: string[] = cookieHeader.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === cookieName) {
        return value;
      }
    }
  }

  private async enter(res: Response, userId: number) {
    // Expires in 30 days
    const authToken = await this.jwtService.signAsync({
      userId,
      expiresIn: 60 * 60 * 24 * 30,
    });

    if (authToken === null || authToken === undefined) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.loginController.invalidTempJWTToken });
    }

    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');
    res
      .cookie('auth_token', authToken, { httpOnly: true, secure: isSecure })
      .redirect(HttpStatus.FOUND, `/courses`);
  }

  private isSecure(): boolean {
    return this.configService.get<string>('DOMAIN').startsWith('https://');
  }
}
