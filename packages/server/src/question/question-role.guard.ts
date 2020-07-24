import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from '../profile/user.entity';
import { QuestionModel } from './question.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const question = await QuestionModel.findOne(request.params.questionId);
    const courseId = question.queue.course.id;
    const user = request.user;
    return this.matchRoles(roles, user, courseId);
  }

  matchRoles(roles: string[], user: UserModel, courseId: number): boolean {
    const userCourse = user.courses.find((course) => {
      return Number(course.courseId) === Number(courseId);
    });

    if (!userCourse) {
      return false;
    }

    const remaining = roles.filter((role) => {
      return userCourse.role.toString() === role;
    });

    return remaining.length > 0;
  }
}
