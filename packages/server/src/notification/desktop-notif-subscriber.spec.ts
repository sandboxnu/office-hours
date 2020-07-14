import { Test, TestingModule } from '@nestjs/testing';
import { DesktopNotifSubscriber } from './desktop-notif-subscriber';

describe('DesktopNotifSubscriber', () => {
  let provider: DesktopNotifSubscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesktopNotifSubscriber],
    }).compile();

    provider = module.get<DesktopNotifSubscriber>(DesktopNotifSubscriber);
  });

  it.skip('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
