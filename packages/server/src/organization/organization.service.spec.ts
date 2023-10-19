import { Connection } from 'typeorm';
import { OrganizationService } from './organization.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TestConfigModule, TestTypeOrmModule } from '../../test/util/testUtils';
import { OrganizationUserModel } from './organization-user.entity';
import { OrganizationFactory, UserFactory } from '../../test/util/factories';
import { OrganizationRole } from '@koh/common';

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

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const organizationUserModel =
        await service.getOrganizationAndRoleByUserId(user.id);
      expect(organizationUserModel).toMatchSnapshot();
    });
  });
});
