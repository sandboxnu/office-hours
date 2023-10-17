/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserModel } from 'profile/user.entity';
import { Response } from 'express';
import { ERROR_MESSAGES, OrganizationRole } from '@koh/common';
import { OrganizationUserModel } from './organization-user.entity';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { OrganizationRolesGuard } from 'guards/organization-roles.guard';
import { CourseModel } from 'course/course.entity';
import { OrganizationCourseModel } from './organization-course.entity';
import { OrganizationModel } from './organization.entity';
import { Roles } from 'decorators/roles.decorator';
import {
  OrganizationService,
  UserResponse,
  CourseResponse,
} from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post(':oid/add_course/:cid')
  @UseGuards(JwtAuthGuard)
  async addCourseToOrganization(
    @Res() res: Response,
    @Param('oid') oid: string,
    @Param('cid') cid: string,
  ): Promise<void> {
    CourseModel.findOne({
      where: { id: cid },
    })
      .then((course) => {
        if (!course) {
          throw new HttpException(
            ERROR_MESSAGES.courseController.courseNotFound,
            HttpStatus.NOT_FOUND,
          );
        }

        OrganizationCourseModel.findOne({
          where: { courseId: cid, organizationId: oid },
        })
          .then((organizationCourse) => {
            if (organizationCourse) {
              throw new HttpException(
                ERROR_MESSAGES.organizationController.courseAlreadyInOrganization,
                HttpStatus.BAD_REQUEST,
              );
            }

            const organizationCourseModel = new OrganizationCourseModel();
            organizationCourseModel.courseId = parseInt(cid);
            organizationCourseModel.organizationId = parseInt(oid);

            organizationCourseModel
              .save()
              .then((_) => {
                res
                  .status(200)
                  .send({ message: 'Course added to organization' });
              })
              .catch((err) => {
                res.status(500).send({ message: err });
              });
          })
          .catch((err) => {
            res.status(500).send({ message: err });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }

  @Get(':oid')
  @UseGuards(JwtAuthGuard)
  async get(@Res() res: Response, @Param('oid') oid: string): Promise<void> {
    OrganizationModel.findOne({
      where: { id: oid },
    })
      .then((organization) => {
        if (!organization) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: ERROR_MESSAGES.organizationController.organizationNotFound,
          });
        }

        res.status(HttpStatus.OK).send(organization);
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }

  @Get(':oid/stats')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard)
  @Roles(OrganizationRole.ADMIN)
  async getStats(@Param('oid') oid: number): Promise<{
    members: number;
    courses: number;
    membersProfessors: number;
  }> {
    const members = await OrganizationUserModel.count({
      where: {
        organizationId: oid,
      },
    });

    const courses = await OrganizationCourseModel.count({
      where: {
        organizationId: oid,
      },
    });

    const membersProfessors = await OrganizationUserModel.count({
      where: {
        organizationId: oid,
        role: OrganizationRole.PROFESSOR,
      },
    });

    return {
      members,
      courses,
      membersProfessors,
    };
  }

  @Get(':oid/get_users/:page?')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard)
  @Roles(OrganizationRole.ADMIN)
  async getUsers(
    @Param('oid') oid: number,
    @Param('page') page: number,
    @Query('search') search: string,
  ): Promise<UserResponse[]> {
    const pageSize = 50;

    if (!search) {
      search = '';
    }

    const users = await this.organizationService.getUsers(
      oid,
      page,
      pageSize,
      search,
    );

    return users;
  }

  @Get(':oid/get_courses/:page?')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard)
  @Roles(OrganizationRole.ADMIN)
  async getCourses(
    @Param('oid') oid: number,
    @Param('page') page: number,
    @Query('search') search: string,
  ): Promise<CourseResponse[]> {
    const pageSize = 50;

    if (!search) {
      search = '';
    }

    const courses = await this.organizationService.getCourses(
      oid,
      page,
      pageSize,
      search,
    );

    return courses;
  }

  @Post(':oid/add_member/:uid')
  @UseGuards(JwtAuthGuard)
  async addUserToOrganization(
    @Res() res: Response,
    @Param('oid') oid: string,
    @Param('uid') uid: string,
  ): Promise<void> {
    UserModel.findOne({
      where: { id: uid },
    })
      .then((user) => {
        if (!user) {
          throw new HttpException(
            ERROR_MESSAGES.profileController.accountNotAvailable,
            HttpStatus.NOT_FOUND,
          );
        }

        OrganizationUserModel.findOne({
          where: { userId: uid, organizationId: oid },
        })
          .then((organizationUser) => {
            if (organizationUser) {
              throw new HttpException(
                ERROR_MESSAGES.organizationController.userAlreadyInOrganization,
                HttpStatus.BAD_REQUEST,
              );
            }

            const organizationUserModel = new OrganizationUserModel();
            organizationUserModel.organizationId = parseInt(oid);
            organizationUserModel.userId = parseInt(uid);
            organizationUserModel.role = OrganizationRole.MEMBER;

            organizationUserModel
              .save()
              .then((_) => {
                res.status(200).send({ message: 'User added to organization' });
              })
              .catch((err) => {
                res.status(500).send({ message: err });
              });
          })
          .catch((err) => {
            res.status(500).send({ message: err });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
}
