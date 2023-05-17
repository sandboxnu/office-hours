import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class asyncQuestionService {
  constructor(
    private connection: Connection, // private notifService: NotificationService,
  ) {}
}
