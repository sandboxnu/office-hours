import { Injectable } from '@nestjs/common';
import { OrganizationUserModel } from './organization-user.entity';

@Injectable()
export class OrganizationService {
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
      id: organizationUser.id,
      organizationName: organizationUser.organization.name,
      organizationDescription: organizationUser.organization.description,
      organizationLogoUrl: organizationUser.organization.logoUrl,
      organizationRole: organizationUser.role,
    };

    return flattenedOrganization;
  }
}
