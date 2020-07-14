import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';

describe('Notification Controller', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
