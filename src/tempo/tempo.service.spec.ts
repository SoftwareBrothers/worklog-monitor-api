import { Test, TestingModule } from '@nestjs/testing';
import { TempoService } from './tempo.service';

describe('TempoService', () => {
  let service: TempoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TempoService],
    }).compile();

    service = module.get<TempoService>(TempoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
