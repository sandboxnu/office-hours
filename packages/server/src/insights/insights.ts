import { Role } from '@koh/common';
import { UserCourseModel } from 'profile/user-course.entity';
import { QueryBuilder } from 'typeorm';

// Types

export interface InsightInterface<Model> {
  name: string;
  description: string;
  roles: Role[];
  component: string; // In the future we can make this an enum
  model: new () => Model; // One of the modals have
  compute: (queryBuilder: QueryBuilder<Model>, insightFilters: any) => any;
  addFilters: (
    queryBuilder: QueryBuilder<Model>,
    filters: any,
  ) => QueryBuilder<Model>;
}

class TotalUsers implements InsightInterface<UserCourseModel> {
  name = 'Total Students';
  description = 'Gets the total number of students';
  roles = [Role.PROFESSOR];
  component: 'SimpleDisplayComponent';
  model = UserCourseModel;
  possibleFilters = ['courseId', 'role'];

  async compute(queryBuilder: QueryBuilder<UserCourseModel>, filters) {
    return await this.addFilters(
      queryBuilder.where("role = 'student'"),
      filters,
    ).getCount();
  }

  addFilters(queryBuilder, filters): QueryBuilder<UserCourseModel> {
    // TODO iterate through the filters, updating the querybuilder
  }
}

export const totalUsers = new TotalUsers();
