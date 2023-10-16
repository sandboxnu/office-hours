import { Injectable } from '@nestjs/common';
import { OrganizationUserModel } from './organization-user.entity';
import { UserModel } from 'profile/user.entity';
import { Brackets, getRepository } from 'typeorm';

export interface UserResponse {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string | null;
  userRole: string;
  organizationRole: string;
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
      .orderBy('UserModel.firstName')
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
