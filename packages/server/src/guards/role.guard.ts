import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from '../profile/user.entity';

export interface RolesGuard {
  canActivate(context: ExecutionContext): Promise<boolean>;

  matchRoles(roles: string[], user: UserModel, courseId: number): boolean;

  setupData(request: any): Promise<{ courseId: number; user: UserModel }>;
}

@Injectable()
export abstract class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { courseId, user } = await this.setupData(request);

    if (!user) {
      throw new UnauthorizedException('Must be logged in');
    }

    if (!courseId) {
      throw new NotFoundException('No courseid found');
    }

    return this.matchRoles(roles, user, courseId);
  }

  matchRoles(roles: string[], user: UserModel, courseId: number): boolean {
    const userCourse = user.courses.find((course) => {
      return Number(course.courseId) === Number(courseId);
    });

    if (!userCourse) {
      // If the user isn't in this course, we shouldn't leak that the course event exists
      throw new NotFoundException('no user course');
    }

    const remaining = roles.filter((role) => {
      return userCourse.role.toString() === role;
    });

    if (remaining.length <= 0) {
      throw new UnauthorizedException(
        `You must have one of roles [${roles.join(
          ', ',
        )}] to access this course`,
      );
    }

    return remaining.length > 0;
  }
}
