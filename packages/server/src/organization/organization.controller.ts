/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserModel } from 'profile/user.entity';
import { Response } from 'express';
import {
  ERROR_MESSAGES,
  GetOrganizationUserResponse,
  OrganizationResponse,
  OrganizationRole,
  Role,
  UpdateOrganizationCourseDetailsParams,
  UpdateOrganizationDetailsParams,
  UpdateOrganizationUserRole,
  UpdateProfileParams,
  UserRole,
  COURSE_TIMEZONES,
} from '@koh/common';
import * as fs from 'fs';
import { OrganizationUserModel } from './organization-user.entity';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { OrganizationRolesGuard } from 'guards/organization-roles.guard';
import { CourseModel } from 'course/course.entity';
import { OrganizationCourseModel } from './organization-course.entity';
import { OrganizationModel } from './organization.entity';
import { Roles } from 'decorators/roles.decorator';
import {
  CourseResponse,
  OrganizationCourseResponse,
  OrganizationService,
  UserResponse,
} from './organization.service';
import { OrganizationGuard } from 'guards/organization.guard';
import * as checkDiskSpace from 'check-disk-space';
import * as path from 'path';
import * as sharp from 'sharp';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SemesterModel } from 'semester/semester.entity';
import { In } from 'typeorm';
import { UserCourseModel } from 'profile/user-course.entity';

@Controller('organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}
  @Post(':oid/create_course')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN, OrganizationRole.PROFESSOR)
  async createCourse(
    @Param('oid') oid: number,
    @Body() courseDetails: UpdateOrganizationCourseDetailsParams,
    @Res() res: Response,
  ): Promise<Response<void>> {
    if (!courseDetails.name || courseDetails.name.trim().length < 1) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.courseController.courseNameTooShort,
      });
    }

    if (
      courseDetails.coordinator_email &&
      courseDetails.coordinator_email.trim().length < 1
    ) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.courseController.coordinatorEmailTooShort,
      });
    }

    if (
      courseDetails.sectionGroupName &&
      courseDetails.sectionGroupName.trim().length < 1
    ) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.courseController.sectionGroupNameTooShort,
      });
    }

    if (courseDetails.zoomLink && courseDetails.zoomLink.trim().length < 1) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.courseController.zoomLinkTooShort,
      });
    }

    if (
      !courseDetails.timezone ||
      !COURSE_TIMEZONES.find((timezone) => timezone === courseDetails.timezone)
    ) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Timezone field is invalid, must be one of ${COURSE_TIMEZONES.join(
          ', ',
        )}`,
      });
    }

    if (courseDetails.semesterId) {
      const semesterInfo = await SemesterModel.findOne({
        where: { id: courseDetails.semesterId },
      });
      if (!semesterInfo) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: ERROR_MESSAGES.courseController.semesterNotFound,
        });
      }
    }
    const course = {
      name: courseDetails.name,
      coordinator_email: courseDetails.coordinator_email,
      sectionGroupName: courseDetails.sectionGroupName,
      zoomLink: courseDetails.zoomLink,
      timezone: courseDetails.timezone,
      semesterId: courseDetails.semesterId,
      enabled: true,
    };
    try {
      const newCourse = await CourseModel.create(course).save();

      for (const profId of courseDetails.profIds) {
        const chosenProfessor = await UserModel.findOne({
          where: { id: profId },
        });

        if (!chosenProfessor) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: `Professor with ID ${profId} not found`,
          });
        }

        await UserCourseModel.create({
          userId: profId,
          course: newCourse,
          role: Role.PROFESSOR,
          override: false,
          expires: false,
        }).save();
      }

      await OrganizationCourseModel.create({
        organizationId: oid,
        course: newCourse,
      }).save();

      return res.status(HttpStatus.OK).send({
        message: 'Course created successfully',
      });
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: err,
      });
    }
  }

  @Patch(':oid/update_course/:cid')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN, OrganizationRole.PROFESSOR)
  async updateCourse(
    @Res() res: Response,
    @Param('oid') oid: number,
    @Param('cid') cid: number,
    @Body() courseDetails: UpdateOrganizationCourseDetailsParams,
  ): Promise<Response<void>> {
    const courseInfo = await OrganizationCourseModel.findOne({
      where: {
        organizationId: oid,
        courseId: cid,
      },
      relations: ['course'],
    });

    if (!courseInfo) {
      return res.status(HttpStatus.NOT_FOUND).send({
        message: ERROR_MESSAGES.courseController.courseNotFound,
      });
    }

    if (!courseDetails.name || courseDetails.name.trim().length < 1) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.courseController.courseNameTooShort,
      });
    }

    if (
      courseInfo.course.coordinator_email &&
      (!courseDetails.coordinator_email ||
        courseDetails.coordinator_email.trim().length < 1)
    ) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.courseController.coordinatorEmailTooShort,
      });
    }

    if (
      courseInfo.course.sectionGroupName &&
      (!courseDetails.sectionGroupName ||
        courseDetails.sectionGroupName.trim().length < 1)
    ) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.courseController.sectionGroupNameTooShort,
      });
    }

    if (
      courseInfo.course.zoomLink &&
      (!courseDetails.zoomLink || courseDetails.zoomLink.trim().length < 1)
    ) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.courseController.zoomLinkTooShort,
      });
    }

    if (
      !courseDetails.timezone ||
      !COURSE_TIMEZONES.find((timezone) => timezone === courseDetails.timezone)
    ) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: `Timezone field is invalid, must be one of ${COURSE_TIMEZONES.join(
          ', ',
        )}`,
      });
    }

    if (courseDetails.semesterId) {
      const semesterInfo = await SemesterModel.findOne({
        where: {
          id: courseDetails.semesterId,
        },
      });

      if (!semesterInfo) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: ERROR_MESSAGES.courseController.semesterNotFound,
        });
      }

      courseInfo.course.semesterId = courseDetails.semesterId;
    }

    courseInfo.course.name = courseDetails.name;

    if (courseDetails.coordinator_email) {
      courseInfo.course.coordinator_email = courseDetails.coordinator_email;
    }

    if (courseDetails.sectionGroupName) {
      courseInfo.course.sectionGroupName = courseDetails.sectionGroupName;
    }

    if (courseDetails.zoomLink) {
      courseInfo.course.zoomLink = courseDetails.zoomLink;
    }
    courseInfo.course.timezone = courseDetails.timezone;

    try {
      await courseInfo.course.save();
      //Remove current profs
      await UserCourseModel.delete({
        courseId: cid,
        role: Role.PROFESSOR,
      });

      for (const profId of courseDetails.profIds) {
        const chosenProfessor = await UserModel.findOne({
          where: { id: profId },
        });

        if (!chosenProfessor) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: ERROR_MESSAGES.profileController.userResponseNotFound,
          });
        }

        const userCourse = await UserCourseModel.findOne({
          where: {
            userId: profId,
            courseId: cid,
          },
        });

        // user is already in the course
        if (userCourse) {
          userCourse.role = Role.PROFESSOR;
          try {
            userCourse.save();
          } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
              message: err,
            });
          }
        } else {
          try {
            await UserCourseModel.create({
              userId: profId,
              courseId: cid,
              role: Role.PROFESSOR,
            }).save();
          } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
              message: err,
            });
          }
        }
      }
    } catch (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: err,
      });
    }

    return res.status(HttpStatus.OK).send({
      message: 'Course updated successfully',
    });
  }

  @Patch(':oid/update_course_access/:cid')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN)
  async updateCourseAccess(
    @Res() res: Response,
    @Param('oid') oid: number,
    @Param('cid') cid: number,
  ): Promise<Response<void>> {
    const courseInfo: OrganizationCourseResponse =
      await this.organizationService.getOrganizationCourse(oid, cid);

    if (!courseInfo) {
      return res.status(HttpStatus.NOT_FOUND).send({
        message: ERROR_MESSAGES.courseController.courseNotFound,
      });
    }

    courseInfo.course.enabled = !courseInfo.course.enabled;

    await courseInfo.course
      .save()
      .then(() => {
        return res.status(HttpStatus.OK).send({
          message: 'Course access updated',
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: err,
        });
      });
  }

  @Get(':oid/get_course/:cid')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard)
  @Roles(OrganizationRole.ADMIN, OrganizationRole.PROFESSOR)
  async getOrganizationCourse(
    @Res() res: Response,
    @Param('oid') oid: number,
    @Param('cid') cid: number,
  ): Promise<Response<OrganizationCourseResponse>> {
    const course = await this.organizationService.getOrganizationCourse(
      oid,
      cid,
    );

    if (!course) {
      return res.status(HttpStatus.NOT_FOUND).send({
        message: ERROR_MESSAGES.courseController.courseNotFound,
      });
    }

    return res.status(HttpStatus.OK).send(course);
  }

  @Get(':oid/get_banner/:photoUrl')
  @UseGuards(JwtAuthGuard)
  async getBannerImage(
    @Param('photoUrl') photoUrl: string,
    @Param('oid') oid: number,
    @Res() res: Response,
  ): Promise<void> {
    fs.stat(
      path.join(process.env.UPLOAD_LOCATION, photoUrl),
      async (err, stats) => {
        if (stats) {
          res.sendFile(photoUrl, {
            root: process.env.UPLOAD_LOCATION,
          });
        } else {
          const organization = await OrganizationModel.findOne({
            where: {
              id: oid,
            },
          });

          organization.bannerUrl = null;
          await organization.save();
          return res.status(HttpStatus.NOT_FOUND).send({
            message: `Banner image for ${organization.name} not found`,
          });
        }
      },
    );
  }

  @Get(':oid/get_logo/:photoUrl')
  @UseGuards(JwtAuthGuard)
  async getLogoImage(
    @Param('photoUrl') photoUrl: string,
    @Param('oid') oid: number,
    @Res() res: Response,
  ): Promise<void> {
    fs.stat(
      path.join(process.env.UPLOAD_LOCATION, photoUrl),
      async (err, stats) => {
        if (stats) {
          res.sendFile(photoUrl, {
            root: process.env.UPLOAD_LOCATION,
          });
        } else {
          const organization = await OrganizationModel.findOne({
            where: {
              id: oid,
            },
          });

          organization.logoUrl = null;
          await organization.save();
          return res.status(HttpStatus.NOT_FOUND).send({
            message: `Logo image for ${organization.name} not found`,
          });
        }
      },
    );
  }

  @Post(':oid/upload_banner')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async uploadBanner(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Param('oid') oid: number,
  ): Promise<Response<void>> {
    const organization = await OrganizationModel.findOne({
      where: {
        id: oid,
      },
    });

    if (!organization) {
      return res.status(HttpStatus.NOT_FOUND).send({
        message: ERROR_MESSAGES.organizationController.organizationNotFound,
      });
    }

    if (organization.bannerUrl) {
      fs.unlink(
        process.env.UPLOAD_LOCATION + '/' + organization.bannerUrl,
        (err) => {
          if (err) {
            const errMessage =
              'Error deleting previous picture at : ' +
              organization.logoUrl +
              'the previous image was at an invalid location?';
            console.error(errMessage);
          }
        },
      );
    }

    const spaceLeft = await checkDiskSpace(path.parse(process.cwd()).root);

    if (spaceLeft.free < 100_000_000) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: ERROR_MESSAGES.organizationController.notEnoughDiskSpace,
      });
    }

    const fileName =
      organization.id +
      '-' +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    await sharp(file.buffer)
      .resize(1920, 1080)
      .toFile(path.join(process.env.UPLOAD_LOCATION, fileName));

    organization.bannerUrl = fileName;

    await organization
      .save()
      .then(() => {
        return res.status(HttpStatus.OK).send({
          message: 'Banner uploaded',
          fileName: fileName,
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: err,
        });
      });
  }

  @Post(':oid/upload_logo')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async uploadLogo(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Param('oid') oid: number,
  ): Promise<Response<void>> {
    const organization = await OrganizationModel.findOne({
      where: {
        id: oid,
      },
    });

    if (!organization) {
      return res.status(HttpStatus.NOT_FOUND).send({
        message: ERROR_MESSAGES.organizationController.organizationNotFound,
      });
    }

    if (organization.logoUrl) {
      fs.unlink(
        process.env.UPLOAD_LOCATION + '/' + organization.logoUrl,
        (err) => {
          if (err) {
            const errMessage =
              'Error deleting previous picture at : ' +
              organization.logoUrl +
              'the previous image was at an invalid location?';
            console.error(errMessage);
          }
        },
      );
    }

    const spaceLeft = await checkDiskSpace(path.parse(process.cwd()).root);

    if (spaceLeft.free < 100_000_000) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: ERROR_MESSAGES.organizationController.notEnoughDiskSpace,
      });
    }

    const fileName =
      organization.id +
      '-' +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    await sharp(file.buffer)
      .resize(256)
      .toFile(path.join(process.env.UPLOAD_LOCATION, fileName));

    organization.logoUrl = fileName;

    await organization
      .save()
      .then(() => {
        return res.status(HttpStatus.OK).send({
          message: 'Logo uploaded',
          fileName: fileName,
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: err,
        });
      });
  }

  @Patch(':oid/update_account_access/:uid')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN)
  async updateUserAccountAccess(
    @Res() res: Response,
    @Param('uid') uid: number,
  ): Promise<Response<void>> {
    const userInfo = await OrganizationUserModel.findOne({
      where: {
        userId: uid,
      },
      relations: ['organizationUser'],
    });

    if (
      userInfo.role === OrganizationRole.ADMIN ||
      userInfo.organizationUser.userRole === UserRole.ADMIN
    ) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: ERROR_MESSAGES.roleGuard.notAuthorized,
      });
    }

    userInfo.organizationUser.accountDeactivated =
      !userInfo.organizationUser.accountDeactivated;

    await userInfo.organizationUser
      .save()
      .then(() => {
        return res.status(HttpStatus.OK).send({
          message: 'User account access updated',
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: err,
        });
      });
  }

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

  @Get()
  async getAllOrganizations(
    @Res() res: Response,
  ): Promise<Response<OrganizationResponse[]>> {
    const organizations = await OrganizationModel.find();

    return res.status(200).send(organizations);
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

  @Patch(':oid/update_user_role')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN)
  async updateUserOrganizationRole(
    @Res() res: Response,
    @Param('oid') oid: string,
    @Body() organizationUserRolePatch: UpdateOrganizationUserRole,
  ): Promise<void> {
    OrganizationModel.findOne({
      where: { id: oid },
    })
      .then((organization) => {
        if (!organization) {
          return res.status(HttpStatus.NOT_FOUND).send({
            message: ERROR_MESSAGES.organizationController.organizationNotFound,
          });
        }

        OrganizationUserModel.findOne({
          where: {
            userId: organizationUserRolePatch.userId,
            organizationId: oid,
          },
        })
          .then((organizationUser) => {
            if (!organizationUser) {
              return res.status(HttpStatus.NOT_FOUND).send({
                message:
                  ERROR_MESSAGES.organizationController
                    .userNotFoundInOrganization,
              });
            }

            if (
              organizationUser.role === OrganizationRole.ADMIN &&
              organizationUserRolePatch.organizationRole !==
                OrganizationRole.ADMIN
            ) {
              return res.status(HttpStatus.BAD_REQUEST).send({
                message:
                  ERROR_MESSAGES.organizationController.cannotRemoveAdminRole,
              });
            }

            organizationUser.role = organizationUserRolePatch.organizationRole;

            organizationUser
              .save()
              .then((_) => {
                res.status(HttpStatus.OK).send({
                  message: 'Organization user role updated',
                });
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

  @Patch(':oid/update')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard)
  @Roles(OrganizationRole.ADMIN)
  async update(
    @Res() res: Response,
    @Param('oid') oid: string,
    @Body() organizationPatch: UpdateOrganizationDetailsParams,
  ): Promise<void> {
    OrganizationModel.findOne({
      where: { id: oid },
    })
      .then((organization) => {
        if (
          !organizationPatch.name ||
          organizationPatch.name.trim().length < 3
        ) {
          return res.status(HttpStatus.BAD_REQUEST).send({
            message:
              ERROR_MESSAGES.organizationController.organizationNameTooShort,
          });
        }

        if (
          !organizationPatch.description ||
          organizationPatch.description.trim().length < 10
        ) {
          return res.status(HttpStatus.BAD_REQUEST).send({
            message:
              ERROR_MESSAGES.organizationController
                .organizationDescriptionTooShort,
          });
        }

        if (
          organizationPatch.websiteUrl &&
          (!organizationPatch.websiteUrl ||
            organizationPatch.websiteUrl.trim().length < 10 ||
            !this.isValidUrl(organizationPatch.websiteUrl))
        ) {
          return res.status(HttpStatus.BAD_REQUEST).send({
            message:
              ERROR_MESSAGES.organizationController
                .organizationUrlTooShortOrInValid,
          });
        }

        organization.name = organizationPatch.name;
        organization.description = organizationPatch.description;

        if (organizationPatch.websiteUrl) {
          organization.websiteUrl = organizationPatch.websiteUrl;
        }

        organization
          .save()
          .then((_) => {
            res.status(HttpStatus.OK).send({
              message: 'Organization updated',
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

  @Delete(':oid/drop_user_courses/:uid')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN)
  async deleteUserCourses(
    @Res() res: Response,
    @Param('uid') uid: number,
    @Body() userCourses: number[],
  ): Promise<Response<void>> {
    if (userCourses.length < 1) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.profileController.noCoursesToDelete,
      });
    }

    const userInfo = await OrganizationUserModel.findOne({
      where: {
        userId: uid,
      },
      relations: ['organizationUser'],
    });

    if (
      userInfo.role === OrganizationRole.ADMIN ||
      userInfo.organizationUser.userRole === UserRole.ADMIN
    ) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: ERROR_MESSAGES.roleGuard.notAuthorized,
      });
    }

    await this.organizationService
      .deleteUserCourses(uid, userCourses)
      .then(() => {
        return res.status(HttpStatus.OK).send({
          message: 'User courses deleted',
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: err,
        });
      });
  }

  @Delete(':oid/delete_profile_picture/:uid')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN)
  async deleteUserProfilePicture(
    @Res() res: Response,
    @Param('uid') oid: number,
  ): Promise<Response<void>> {
    const userInfo = await OrganizationUserModel.findOne({
      where: {
        userId: oid,
      },
      relations: ['organizationUser'],
    });

    if (
      userInfo.role === OrganizationRole.ADMIN ||
      userInfo.organizationUser.userRole === UserRole.ADMIN
    ) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: ERROR_MESSAGES.roleGuard.notAuthorized,
      });
    }

    if (!userInfo.organizationUser.photoURL) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.profileController.noProfilePicture,
      });
    }

    fs.unlink(
      process.env.UPLOAD_LOCATION + '/' + userInfo.organizationUser.photoURL,
      async (err) => {
        if (err) {
          const errMessage =
            'Error deleting previous picture at : ' +
            userInfo.organizationUser.photoURL +
            ' the previous image was at an invalid location?';
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: errMessage,
          });
        } else {
          userInfo.organizationUser.photoURL = null;
          await userInfo.organizationUser.save();
          return res.status(HttpStatus.OK).send({
            message: 'Profile picture deleted',
          });
        }
      },
    );
  }

  @Patch(':oid/edit_user/:uid')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN)
  async patchUserInfo(
    @Res() res: Response,
    @Param('uid') uid: number,
    @Body() userDetailsBody: UpdateProfileParams,
  ): Promise<Response<void>> {
    const userInfo = await OrganizationUserModel.findOne({
      where: {
        userId: uid,
      },
      relations: ['organizationUser', 'organization'],
    });

    if (
      userInfo.role === OrganizationRole.ADMIN ||
      userInfo.organizationUser.userRole === UserRole.ADMIN ||
      userInfo.organization.ssoEnabled
    ) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: ERROR_MESSAGES.roleGuard.notAuthorized,
      });
    }

    const { firstName, lastName, email, sid } = userDetailsBody;

    if (firstName.trim().length < 1) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.profileController.firstNameTooShort,
      });
    }

    if (lastName.trim().length < 1) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.profileController.lastNameTooShort,
      });
    }

    if (email.trim().length < 1) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.profileController.emailTooShort,
      });
    }

    if (userInfo.organizationUser.sid && sid < 1) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.profileController.sidInvalid,
      });
    }

    if (userInfo.organizationUser.email !== email) {
      const emailInUse = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (emailInUse) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: ERROR_MESSAGES.profileController.emailInUse,
        });
      }
    }

    userInfo.organizationUser.firstName = firstName;
    userInfo.organizationUser.lastName = lastName;
    userInfo.organizationUser.email = email;
    userInfo.organizationUser.sid = sid;

    await userInfo.organizationUser
      .save()
      .then(() => {
        return res.status(HttpStatus.OK).send({
          message: 'User info updated',
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: err,
        });
      });
  }

  @Get(':oid/get_user/:uid')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard, OrganizationGuard)
  @Roles(OrganizationRole.ADMIN)
  async getUser(
    @Res() res: Response,
    @Param('uid') uid: number,
  ): Promise<Response<GetOrganizationUserResponse>> {
    const userInfo =
      await this.organizationService.getOrganizationUserByUserId(uid);

    if (userInfo.organizationRole === OrganizationRole.ADMIN) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: ERROR_MESSAGES.roleGuard.mustBeRoleToAccess([
          OrganizationRole.ADMIN,
        ]),
      });
    }

    return res.status(HttpStatus.OK).send(userInfo);
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

  @Get(':oid/get_professors')
  @UseGuards(JwtAuthGuard, OrganizationRolesGuard)
  @Roles(OrganizationRole.ADMIN)
  async getProfessors(@Param('oid') oid: number): Promise<any> {
    const orgProfs = OrganizationUserModel.find({
      where: {
        organizationId: oid,
        role: In([OrganizationRole.PROFESSOR, OrganizationRole.ADMIN]),
      },
      relations: ['organizationUser'],
    });
    return orgProfs;
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

  private isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
}
