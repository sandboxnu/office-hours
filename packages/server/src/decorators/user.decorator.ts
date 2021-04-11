import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from '../profile/user.entity';

export const User = createParamDecorator<string[]>(
  async (relations: string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return await UserModel.findOne(request.user.userId, { relations });
  },
);

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return Number(request.user.userId);
  },
);
