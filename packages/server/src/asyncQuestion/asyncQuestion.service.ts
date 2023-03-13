import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class AsyncQuestionService {
  constructor(private connection: Connection) {}
}
