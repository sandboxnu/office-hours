import { Injectable, NotFoundException } from '@nestjs/common';
import { AsyncQuestionModel } from 'asyncQuestion/asyncQuestion.entity';
import { Connection } from 'typeorm';
import { ImageModel } from './image.entity';

@Injectable()
export class ImageService {
  constructor(private connection: Connection) {}

  async uploadImage(
    dataBuffer: Buffer,
    filename: string,
    question: AsyncQuestionModel,
  ): Promise<ImageModel> {
    const newFile = await ImageModel.create({
      filename: filename,
      data: dataBuffer,
      asyncQuestion: question,
    }).save();
    return newFile;
  }
  async patchImage(
    dataBuffer: Buffer,
    filename: string,
    id: number,
  ): Promise<ImageModel> {
    const image = await ImageModel.findOne(id);
    if (!image) {
      throw new NotFoundException();
    }
    Object.assign(image, { filename: filename, data: dataBuffer });
    image.save();
    return image;
  }

  async getFileById(fileId: number): Promise<ImageModel> {
    const file = await ImageModel.findOne({ where: { id: fileId } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
