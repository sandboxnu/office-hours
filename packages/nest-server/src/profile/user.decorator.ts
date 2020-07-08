import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserModel } from './user.entity';

export const User = createParamDecorator<string[]>(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return await UserModel.findOne(request.user.userId, {
      relations: data as string[],
    });
  },
);
