import {
  Controller,
  Get,
  HttpStatus,
  Next,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { ERROR_MESSAGES } from '@koh/common';
import { JwtService } from '@nestjs/jwt';
import * as passport from 'passport';
import { MultiSamlStrategy } from 'passport-saml';
import { OrganizationModel } from 'organization/organization.entity';
import * as path from 'path';
import * as fs from 'fs';

@Controller('auth')
export class AuthController {
  private GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

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

  @Get('saml/:oid')
  authSaml(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param('oid') organizationId: number,
  ): Response<any> {
    res.cookie('organization.id', organizationId, {
      httpOnly: true,
      secure: this.isSecure(),
    });

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    passport.use(this.strategy);
    // @ts-expect-error Missing `additionalParams` on the type.
    passport.authenticate('saml', {
      failureRedirect: '/auth/failed/40001',
      session: false,
      additionalParams: req.query.RelayState
        ? {
            // This is used be the SAML configuration page to test SAML. It includes
            // `?RelayState=test` in the login request. When the callback page receives
            // that value, it displays the received attributes instead of creating a
            // new session for the user.
            RelayState: req.query.RelayState,
          }
        : undefined,
    })(req, res, next);

    return;
  }

  @Post('callback/saml')
  async callbackPost(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response<void>> {
    const organizationId = this.getCookie(req, 'organization.id');

    if (!organizationId) {
      res.redirect(`/auth/failed/40000`);
    } else {
      try {
        const user = await this.samlAuthenticate(req, res);
        console.log(user);
        res.clearCookie('organization.id', {
          httpOnly: true,
          secure: this.isSecure(),
        });
        return;
      } catch (err) {
        res.redirect(`/auth/failed/40001`);
      }
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

  private samlAuthenticate(req: Request, res: Response): Promise<any> {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'saml',
        {
          failureRedirect: '/auth/failed/40001',
          session: false,
        },
        (err, user) => {
          if (err) {
            reject(err);
          } else if (!user) {
            reject(new Error('No user'));
          } else {
            resolve(user);
          }
        },
      )(req, res);
    });
  }

  private strategy = new MultiSamlStrategy(
    {
      passReqToCallback: true,
      getSamlOptions: (req, done) => {
        OrganizationModel.findOne({
          where: { id: Number(req.params.oid) },
        })
          .then((organization) => {
            if (!organization) {
              return done(new Error('Invalid organization'));
            }

            if (!organization.ssoEnabled) {
              return done(new Error('SSO is not enabled'));
            }

            const host = req.headers.host;
            const protocol = req.protocol;
            const issuer = `https://help.cosc304.ok.ubc.ca/shibboleth`;

            done(null, {
              host,
              protocol,
              path: '/api/v1/auth/callback/saml',
              entryPoint:
                'https://authentication.ubc.ca/idp/profile/SAML2/Redirect/SSO',
              issuer,
              idpIssuer: organization.ssoUrl,
              signatureAlgorithm: 'sha256',
              digestAlgorithm: 'sha256',
              cert: fs.readFileSync(
                path.join(path.resolve(__dirname, '../..'), 'cert.pem'),
                'utf-8',
              ),
              privateKey: fs.readFileSync(
                path.join(path.resolve(__dirname, '../..'), 'prvk.pem'),
                'utf-8',
              ),
              decryptionPvk: fs.readFileSync(
                path.join(path.resolve(__dirname, '../..'), 'prvk.pem'),
                'utf-8',
              ),
            });
          })
          .catch((err) => done(err));
      },
    },
    (req, profile, done) => {
      done(null, profile ?? undefined);
    },
  );
}
