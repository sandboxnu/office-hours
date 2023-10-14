import { Injectable } from '@nestjs/common';
import { OrganizationUserModel } from './organization-user.entity';

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

  public async getOrganizationIdForUser(userId: number): Promise<number> {
    const organizationUser = await OrganizationUserModel.findOne({
      where: {
        userId,
      },
    });
    if (!organizationUser) {
      return null;
    }
    return organizationUser.organizationId;
  }
}
