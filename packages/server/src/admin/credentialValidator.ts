import { AdminUserModel } from './admin-user.entity';
import {compare} from 'bcrypt';

export const adminCredentialValidator = {
  inject: [],
  useFactory: () => {
    return async function validateCredentials(
      username: string,
      password: string,
    ): Promise<AdminUserModel> {
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
