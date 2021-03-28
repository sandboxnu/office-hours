import { compare } from 'bcrypt';
import { AdminUserModel } from './admin-user.entity';

export const adminCredentialValidator = {
  inject: [],
  useFactory: () => {
    return async function validateCredentials(
      username: string,
      password: string,
    ): Promise<AdminUserModel | null> {
      const user = await AdminUserModel.findOne({ username });
      if (user) {
        if (await compare(password, user.passwordHash)) {
          return user;
        }
      }
      return null;
    };
  },
};
