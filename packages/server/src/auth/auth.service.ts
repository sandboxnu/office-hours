import { AccountType } from '@koh/common';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { OrganizationUserModel } from 'organization/organization-user.entity';
import { UserModel } from 'profile/user.entity';

@Injectable()
export class AuthService {
  client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
  }

  async loginWithGoogle(
    auth_code: string,
    organizationId: number,
  ): Promise<number> {
    try {
      const { tokens } = await this.client.getToken(auth_code);

      const ticket = await this.client.verifyIdToken({
        idToken: tokens.id_token,
        audience: `${process.env.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
      });

      const payload = ticket.getPayload();

      if (!payload.email_verified) {
        throw new BadRequestException('Email not verified');
      }

      const user = await UserModel.findOne({ email: payload.email });

      if (user && user.password) {
        throw new BadRequestException(
          'User collisions with legacy account are not allowed',
        );
      }

      if (user) {
        return user.id;
      }

      if (!user) {
        const newUser = await UserModel.create({
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.family_name,
          photoURL: payload.picture,
          accountType: AccountType.GOOGLE,
        }).save();

        const userId = newUser.id;

        await OrganizationUserModel.create({
          organizationId,
          userId: userId,
        }).save();

        return userId;
      }

      throw new InternalServerErrorException('Unexpected error');
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
