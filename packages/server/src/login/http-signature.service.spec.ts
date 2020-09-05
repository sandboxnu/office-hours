import { Test, TestingModule } from '@nestjs/testing';
import { HttpSignatureService } from './http-signature.service';

describe('HttpSignatureService', () => {
  let service: HttpSignatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpSignatureService],
    }).compile();

    service = module.get<HttpSignatureService>(HttpSignatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
