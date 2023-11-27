import { Connection } from 'typeorm';
import { OrganizationService } from './organization.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TestConfigModule, TestTypeOrmModule } from '../../test/util/testUtils';
import { OrganizationUserModel } from './organization-user.entity';
import {
  CourseFactory,
  OrganizationFactory,
  UserFactory,
} from '../../test/util/factories';
import { OrganizationRole, UserRole } from '@koh/common';
import { OrganizationCourseModel } from './organization-course.entity';
import { UserCourseModel } from 'profile/user-course.entity';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [OrganizationService],
    }).compile();
    service = module.get<OrganizationService>(OrganizationService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  describe('getOrganizationAndRoleByUserId', () => {
    it('should return null if no organizationUser exists', async () => {
      const role = await service.getOrganizationAndRoleByUserId(0);
      expect(role).toBeNull();
    });

    it('should return the organization and role of the organizationUser', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const organizationUserModel =
        await service.getOrganizationAndRoleByUserId(user.id);
      expect(organizationUserModel).toMatchSnapshot();
    });
  });

  describe('deleteUserCourses', () => {
    it('should throw not found exception if user does not exist', async () => {
      await expect(
        service.deleteUserCourses(0, [1]),
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    it('should delete user courses', async () => {
      const user = await UserFactory.create();
      const courseOne = await CourseFactory.create();
      const courseTwo = await CourseFactory.create();
      const organization = await OrganizationFactory.create();

      await UserCourseModel.create({
        userId: user.id,
        courseId: courseOne.id,
      }).save();

      await UserCourseModel.create({
        userId: user.id,
        courseId: courseTwo.id,
      }).save();

      await OrganizationCourseModel.create({
        organizationId: organization.id,
        courseId: courseOne.id,
      }).save();

      await OrganizationCourseModel.create({
        organizationId: organization.id,
        courseId: courseTwo.id,
      }).save();

      await OrganizationUserModel.create({
        organizationId: organization.id,
        userId: user.id,
      }).save();

      await service.deleteUserCourses(user.id, [courseOne.id, courseTwo.id]);

      const userCourses = await UserCourseModel.find({
        where: {
          userId: user.id,
        },
      });

      expect(userCourses).toHaveLength(0);
    });
  });

  describe('getCourses', () => {
    it('should return organization courses', async () => {
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create();

      await OrganizationCourseModel.create({
        organizationId: organization.id,
        courseId: course.id,
      }).save();

      const courses = await service.getCourses(organization.id, 1, 50);
      expect(courses).toMatchSnapshot();
    });

    it('should not return organization courses if no courses match search query', async () => {
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create({
        name: 'test',
      });

      await OrganizationCourseModel.create({
        organizationId: organization.id,
        courseId: course.id,
      }).save();

      const courses = await service.getCourses(
        organization.id,
        1,
        50,
        'notMatchingSearch',
      );
      expect(courses).toHaveLength(0);
    });

    it('should not return organization if no courses are available', async () => {
      const organization = await OrganizationFactory.create();
      const courses = await service.getCourses(organization.id, 1, 50);
      expect(courses).toHaveLength(0);
    });

    it('should return organization courses with search', async () => {
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create({
        name: 'test',
      });

      const courseTwo = await CourseFactory.create({
        name: 'courseNotMatchingSearch',
      });

      await OrganizationCourseModel.create({
        organizationId: organization.id,
        courseId: course.id,
      }).save();

      await OrganizationCourseModel.create({
        organizationId: organization.id,
        courseId: courseTwo.id,
      }).save();

      const courses = await service.getCourses(organization.id, 1, 50, 'test');
      expect(courses).toMatchSnapshot();
    });
  });

  describe('getUsers', () => {
    it('should return empty organization users if no users are available', async () => {
      const organization = await OrganizationFactory.create();
      const users = await service.getUsers(organization.id, 1, 50);
      expect(users).toHaveLength(0);
    });

    it('should return empty organization users if no users match search query', async () => {
      const organization = await OrganizationFactory.create();
      const user = await UserFactory.create({
        firstName: 'test',
      });

      await OrganizationUserModel.create({
        organizationId: organization.id,
        userId: user.id,
      }).save();

      const users = await service.getUsers(
        organization.id,
        1,
        50,
        'notMatchingSearch',
      );

      expect(users).toHaveLength(0);
    });

    it('should return organization users with search', async () => {
      const organization = await OrganizationFactory.create();
      const user = await UserFactory.create({
        firstName: 'test',
      });

      const userTwo = await UserFactory.create({
        firstName: 'userNotMatchingSearch',
      });

      await OrganizationUserModel.create({
        organizationId: organization.id,
        userId: user.id,
      }).save();

      await OrganizationUserModel.create({
        organizationId: organization.id,
        userId: userTwo.id,
      }).save();

      const users = await service.getUsers(organization.id, 1, 50, 'test');
      expect(users).toMatchSnapshot();
    });

    it('should return organization users', async () => {
      const organization = await OrganizationFactory.create();
      const userOne = await UserFactory.create();
      const userTwo = await UserFactory.create();

      await OrganizationUserModel.create({
        organizationId: organization.id,
        userId: userOne.id,
      }).save();

      await OrganizationUserModel.create({
        organizationId: organization.id,
        userId: userTwo.id,
      }).save();

      const users = await service.getUsers(organization.id, 1, 50);
      expect(users).toMatchSnapshot();
    });
  });

  describe('getOrganizationUserByUserId', () => {
    it("should throw not found exception if user doesn' exist", async () => {
      await expect(
        service.getOrganizationUserByUserId(0),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"OrganizationUser with userId 0 not found"`,
      );
    });

    it('should return organizationUser globalRole as unknown when user global role is admin', async () => {
      const user = await UserFactory.create({
        userRole: UserRole.ADMIN,
      });
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const organizationUser = await service.getOrganizationUserByUserId(
        user.id,
      );
      expect(organizationUser).toMatchSnapshot();
    });

    it('should return the organizationUser', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const organizationUser = await service.getOrganizationUserByUserId(
        user.id,
      );
      expect(organizationUser).toMatchSnapshot();
    });
  });

  describe('getOrganizationCourse', () => {
    it('should throw not found exception if organization course does not exist', async () => {
      await expect(
        service.getOrganizationCourse(0, 0),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"OrganizationCourse with organizationId 0 and courseId 0 not found"`,
      );
    });

    it('should return organization course', async () => {
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create();

      await OrganizationCourseModel.create({
        organizationId: organization.id,
        courseId: course.id,
      }).save();

      const organizationCourse = await service.getOrganizationCourse(
        organization.id,
        course.id,
      );
      expect(organizationCourse).toMatchSnapshot();
    });
  });
});
