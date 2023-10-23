import { Injectable } from '@nestjs/common';
import { OrganizationUserModel } from './organization-user.entity';
import { UserModel } from 'profile/user.entity';
import { Brackets, getRepository } from 'typeorm';
import { OrganizationCourseModel } from './organization-course.entity';
import { CourseModel } from 'course/course.entity';
import { GetOrganizationUserResponse, UserRole } from '@koh/common';

export interface UserResponse {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string | null;
  userRole: string;
  organizationRole: string;
}

export interface CourseResponse {
  courseId: number;
  courseName: string;
}

@Injectable()
export class OrganizationService {
  public async getOrganizationRoleByUserId(userId: number): Promise<string> {
    const organizationUser = await OrganizationUserModel.findOne({
      where: {
        userId,
      },
    });

    if (!organizationUser) {
      return null;
    }
    return organizationUser.role;
  }

  public async getCourses(
    organizationId: number,
    page: number,
    pageSize: number,
    search?: string,
  ): Promise<CourseResponse[]> {
    const organizationCourses = await getRepository(OrganizationCourseModel)
      .createQueryBuilder()
      .leftJoin(
        CourseModel,
        'CourseModel',
        'CourseModel.id = OrganizationCourseModel.courseId',
      )
      .where('OrganizationCourseModel.organizationId = :organizationId', {
        organizationId,
      });

    if (search) {
      const likeSearch = `%${search.replace(' ', '')}%`.toUpperCase();
      organizationCourses.andWhere(
        new Brackets((q) => {
          q.where('UPPER("CourseModel"."name") like :searchString', {
            searchString: likeSearch,
          });
        }),
      );
    }

    const courses = organizationCourses.select([
      'CourseModel.id as courseId',
      'CourseModel.name as courseName',
    ]);

    const coursesSubset = await courses
      .orderBy('CourseModel.name')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      // .getMany() wouldn't work here because relations are not working well with getMany()
      .getRawMany();

    const coursesResponse = coursesSubset.map((course) => {
      return {
        courseId: course.courseid,
        courseName: course.coursename,
      };
    });

    return coursesResponse;
  }

  public async getUsers(
    organizationId: number,
    page: number,
    pageSize: number,
    search?: string,
  ): Promise<UserResponse[]> {
    const organizationUsers = await getRepository(OrganizationUserModel)
      .createQueryBuilder()
      .leftJoin(
        UserModel,
        'UserModel',
        'UserModel.id = OrganizationUserModel.userId',
      )
      .where('OrganizationUserModel.organizationId = :organizationId', {
        organizationId,
      });

    if (search) {
      const likeSearch = `%${search.replace(' ', '')}%`.toUpperCase();
      organizationUsers.andWhere(
        new Brackets((q) => {
          q.where(
            'CONCAT(UPPER("UserModel"."firstName"), UPPER("UserModel"."lastName")) like :searchString',
            {
              searchString: likeSearch,
            },
          );
        }),
      );
    }

    const users = organizationUsers.select([
      'UserModel.id as userId',
      'UserModel.firstName as userFirstName',
      'UserModel.lastName as userLastName',
      'UserModel.email as userEmail',
      'UserModel.photoURL as userPhotoUrl',
      'UserModel.userRole as userRole',
      'OrganizationUserModel.role as userOrganizationRole',
    ]);

    const usersSubset = await users
      .orderBy('UserModel.lastName')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      // .getMany() wouldn't work here because relations are not working well with getMany()
      .getRawMany();

    const usersResponse = usersSubset.map((user) => {
      return {
        userId: user.userid,
        firstName: user.userfirstname,
        lastName: user.userlastname,
        email: user.useremail,
        photoUrl: user.userphotourl,
        userRole: user.userrole,
        organizationRole: user.userorganizationrole,
      };
    });

    return usersResponse;
  }

  public async getOrganizationUserByUserId(
    userId: number,
  ): Promise<GetOrganizationUserResponse> {
    const { organizationId, role, organizationUser } =
      await OrganizationUserModel.findOne({
        where: {
          userId,
        },
        relations: [
          'organizationUser',
          'organizationUser.courses',
          'organizationUser.courses.course',
        ],
      });

    const globalRole: string =
      organizationUser.userRole == UserRole.ADMIN ? 'unknown' : 'user';

    const flattenedUser = {
      organizationId: organizationId,
      organizationRole: role,
      user: {
        id: organizationUser.id,
        firstName: organizationUser.firstName,
        lastName: organizationUser.lastName,
        email: organizationUser.email,
        photoUrl: organizationUser.photoURL,
        fullName: organizationUser.name,
        globalRole: globalRole,
        sid: organizationUser.sid,
      },
      courses: organizationUser.courses.map((courseInfo) => {
        const { role, course } = courseInfo;

        return {
          id: course.id,
          name: course.name,
          role: role,
        };
      }),
    };

    return flattenedUser;
  }

  public async getOrganizationAndRoleByUserId(userId: number): Promise<any> {
    const organizationUser = await OrganizationUserModel.createQueryBuilder(
      'organizationUser',
    )
      .leftJoinAndSelect('organizationUser.organization', 'organization')
      .where('organizationUser.userId = :userId', { userId })
      .getOne();

    if (!organizationUser) {
      return null;
    }

    const flattenedOrganization = {
      id: organizationUser.organizationId,
      organizationName: organizationUser.organization.name,
      organizationDescription: organizationUser.organization.description,
      organizationLogoUrl: organizationUser.organization.logoUrl,
      organizationRole: organizationUser.role,
    };

    return flattenedOrganization;
  }
}
