import { ERROR_MESSAGES } from '@koh/common';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { OrganizationUserModel } from 'organization/organization-user.entity';

@Injectable()
export class OrganizationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = await this.setupData(request);
    const organizationId = request.params.oid;

    if (!user) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.roleGuard.userNotInOrganization,
      );
    }

    return await this.matchOrganizations(
      Number(organizationId),
      user.organizationId,
    );
  }

  async setupData(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    request: any,
  ): Promise<{ user: OrganizationUserModel }> {
    const user = await OrganizationUserModel.findOne({
      where: {
        userId:
          request.params.uid || request.body.userId || request.user.userId,
        organizationId: request.params.oid,
      },
    });

    return { user };
  }

  async matchOrganizations(
    organizationId: number,
    userOrganizationId: number,
  ): Promise<boolean> {
    if (userOrganizationId !== organizationId) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.roleGuard.userNotInOrganization,
      );
    }

    return true;
  }
}
