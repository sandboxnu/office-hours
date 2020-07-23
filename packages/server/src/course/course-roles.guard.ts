import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from '../profile/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(request);
    const courseId = request.params.id;
    return this.matchRoles(roles, user, courseId);
  }

  matchRoles(roles: string[], user: UserModel, courseId: number): boolean {
    const userCourse = user.courses.find((course) => course.id === courseId);
    if (!userCourse) {
      return false;
    }
    const remaining = roles.filter((role) => {
      userCourse.role === role;
    });

    return remaining.length > 0;
  }
}
