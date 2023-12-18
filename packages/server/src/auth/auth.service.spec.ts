import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TestConfigModule, TestTypeOrmModule } from '../../test/util/testUtils';
import { UserModel } from 'profile/user.entity';
import { Connection } from 'typeorm';
import { OrganizationFactory } from '../../test/util/factories';
import { AccountType } from '@koh/common';

// Extend the OAuth2Client mock with additional methods
jest.mock('google-auth-library', () => {
  const actualLibrary = jest.requireActual('google-auth-library');

  class MockOAuth2Client extends actualLibrary.OAuth2Client {
    async getToken(code: string): Promise<any> {
      if (code === 'valid_code') {
        return Promise.resolve({ tokens: { id_token: 'valid_token' } });
      } else {
        return Promise.resolve({ tokens: { id_token: 'mocked_token' } });
      }
    }

    async verifyIdToken(options: any): Promise<any> {
      if (options.idToken !== 'valid_token') {
        return Promise.resolve({
          getPayload: () => ({
            email_verified: false,
            email: 'mocked_email@example.com',
            given_name: 'John',
            family_name: 'Doe',
            picture: 'mocked_picture_url',
          }),
        });
      } else {
        return Promise.resolve({
          getPayload: () => ({
            email_verified: true,
            email: 'mocked_email@example.com',
            given_name: 'John',
            family_name: 'Doe',
            picture: 'mocked_picture_url',
          }),
        });
      }
    }
  }

  return {
    OAuth2Client: MockOAuth2Client,
  };
});

describe('AuthService', () => {
  let service: AuthService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  describe('loginWithShibboleth', () => {
    it('should throw an error when user already exists with password', async () => {
      await UserModel.create({
        email: 'mocked_email@example.com',
        password: 'test_password',
      }).save();

      await expect(
        service.loginWithShibboleth(
          'mocked_email@example.com',
          'student@ubc.ca',
          'John',
          'Doe',
          1,
        ),
      ).rejects.toThrowError(
        'User collisions with legacy account are not allowed',
      );
    });

    it('should throw an error when user already exists with other account type', async () => {
      await UserModel.create({
        email: 'mocked_email@example.com',
        accountType: AccountType.GOOGLE,
      }).save();

      await expect(
        service.loginWithShibboleth(
          'mocked_email@example.com',
          'student@ubc.ca',
          'John',
          'Doe',
          1,
        ),
      ).rejects.toThrowError(
        'User collisions with other account types are not allowed',
      );
    });

    it('should return user id when user already exists without password', async () => {
      const user = await UserModel.create({
        email: 'mocked_email@example.com',
        accountType: AccountType.SHIBBOLETH,
      }).save();

      const userId = await service.loginWithShibboleth(
        'mocked_email@example.com',
        'student@ubc.ca',
        'John',
        'Doe',
        1,
      );
      expect(userId).toEqual(user.id);
    });

    it('should create a new user when user does not exist', async () => {
      const organization = await OrganizationFactory.create();

      const userId = await service.loginWithShibboleth(
        'mocked_email@example.com',
        'student@ubc.ca',
        'John',
        'Doe',
        organization.id,
      );
      const user = await UserModel.findOne(userId);
      expect(user).toMatchSnapshot();
    });
  });

  describe('loginWithGoogle', () => {
    it('should throw an error when email is not verified', async () => {
      await expect(service.loginWithGoogle('invalid_token', 1)).rejects.toThrow(
        'Email not verified',
      );
    });

    it('should throw an error when user already exists with password', async () => {
      await UserModel.create({
        email: 'mocked_email@example.com',
        password: 'test_password',
      }).save();

      await expect(
        service.loginWithGoogle('valid_code', 1),
      ).rejects.toThrowError(
        'User collisions with legacy account are not allowed',
      );
    });

    it('should throw an error when user already exists with other account type', async () => {
      await UserModel.create({
        email: 'mocked_email@example.com',
        accountType: AccountType.SHIBBOLETH,
      }).save();

      await expect(
        service.loginWithGoogle('valid_code', 1),
      ).rejects.toThrowError(
        'User collisions with other account types are not allowed',
      );
    });

    it('should return user id when user already exists without password', async () => {
      const user = await UserModel.create({
        email: 'mocked_email@example.com',
        accountType: AccountType.GOOGLE,
      }).save();

      const userId = await service.loginWithGoogle('valid_code', 1);
      expect(userId).toEqual(user.id);
    });

    it('should create a new user when user does not exist', async () => {
      const organization = await OrganizationFactory.create();

      const userId = await service.loginWithGoogle(
        'valid_code',
        organization.id,
      );
      const user = await UserModel.findOne(userId);
      expect(user).toMatchSnapshot();
    });
  });
});
