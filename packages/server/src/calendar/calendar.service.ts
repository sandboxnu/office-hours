import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class CalendarService {
  constructor(private connection: Connection) {}
}
