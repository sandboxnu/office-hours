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
import { OrganizationRole } from '@koh/common';
import { OrganizationCourseModel } from './organization-course.entity';

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

  describe('getOrganizationRoleByUserId', () => {
    it('should return null if no organizationUser exists', async () => {
      const role = await service.getOrganizationRoleByUserId(0);
      expect(role).toBeNull();
    });

    it('should return the role of the organizationUser', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const role = await service.getOrganizationRoleByUserId(user.id);
      expect(role).toEqual(OrganizationRole.MEMBER);
    });
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
  });

  describe('getUsers', () => {
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
});
