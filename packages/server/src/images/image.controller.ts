import { ImageService } from './image.service';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  ParseIntPipe,
  UseInterceptors,
  Param,
  Res,
  UseGuards,
  NotFoundException,
  ClassSerializerInterceptor,
  UnauthorizedException,
  Body,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { Readable } from 'stream';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ImageModel } from './image.entity';
import { Role } from '@koh/common';
import { UserModel } from 'profile/user.entity';
import { User } from '../decorators/user.decorator';
import { UserCourseModel } from 'profile/user-course.entity';
import { AsyncQuestionModel } from 'asyncQuestion/asyncQuestion.entity';

@Controller('image')
@UseGuards(JwtAuthGuard)
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async addImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { AsyncQuestionId: string },
  ) {
    // upload image
    const question = await AsyncQuestionModel.findOne({
      where: { id: Number(body.AsyncQuestionId) },
    });
    if (!question) {
      throw new NotFoundException();
    }
    const image = await this.imageService.uploadImage(
      file.buffer,
      file.originalname,
      question,
    );
    const images = [];
    images.push(image);
    question.images = images;
    await question.save();
  }
  @Patch(':id/update')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @UploadedFile() file: Express.Multer.File,
    @Param() id: number,
  ): Promise<any> {
    await this.imageService.patchImage(file.buffer, file.originalname, id);
  }
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.STUDENT)
  async getDatabaseFileById(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
    @User() user: UserModel,
  ): Promise<any> {
    // currently only store 1 image per question
    const image = await ImageModel.findOne({
      where: { id: id },
      relations: ['asyncQuestion'],
    });
    if (!image) {
      throw new NotFoundException();
    }
    //check whether related question is visible. If not, only prof and creator can see.
    if (!image.asyncQuestion.visible) {
      const usercourse = await UserCourseModel.findOne({
        where: {
          userId: user.id,
          courseId: image.asyncQuestion.courseId,
        },
      });
      if (!usercourse) {
        throw new NotFoundException();
      }
      if (
        user.id !== image.asyncQuestion.creatorId &&
        usercourse.role === Role.STUDENT &&
        image.asyncQuestion.visible == false
      )
        throw new UnauthorizedException();
    }
    try {
      const stream = Readable.from(image.data);

      stream.pipe(response);
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':qid/getImageIdsByQuestion')
  async getImageIdsByQuestion(@Param('qid') qid: number): Promise<number[]> {
    const images = await ImageModel.find({
      where: {
        asyncQuestion: qid,
      },
    });
    const imageIds = images.map((image) => image.id);
    return imageIds;
  }
}
