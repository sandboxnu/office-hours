import { AccountType, OrganizationRole } from '@koh/common';
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

  async loginWithShibboleth(
    mail: string,
    role: string,
    givenName: string,
    lastName: string,
    organizationId: number,
  ): Promise<number> {
    try {
      const user = await UserModel.findOne({ email: mail });

      if (user && user.password) {
        throw new BadRequestException(
          'User collisions with legacy account are not allowed',
        );
      }

      if (user && user.accountType !== AccountType.SHIBBOLETH) {
        throw new BadRequestException(
          'User collisions with other account types are not allowed',
        );
      }

      if (user) {
        return user.id;
      }

      if (!user) {
        const newUser = await UserModel.create({
          email: mail,
          firstName: givenName,
          lastName: lastName,
          accountType: AccountType.SHIBBOLETH,
        }).save();

        const userId = newUser.id;

        await OrganizationUserModel.create({
          organizationId,
          userId: userId,
          role: this.getRole(role),
        }).save();

        return userId;
      }

      throw new InternalServerErrorException('Unexpected error');
    } catch (err) {
      throw new BadRequestException(err.message);
    }
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

      if (user && user.accountType !== AccountType.GOOGLE) {
        throw new BadRequestException(
          'User collisions with other account types are not allowed',
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

  private getRole(role: string): OrganizationRole {
    const roles = role.split(';');

    if (roles[0].split('@')[0] !== 'student') {
      return OrganizationRole.PROFESSOR;
    } else {
      return OrganizationRole.MEMBER;
    }
  }
}
