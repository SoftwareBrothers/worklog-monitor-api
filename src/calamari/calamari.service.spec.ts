import { Test, TestingModule } from '@nestjs/testing';

import { CalamariService } from './calamari.service';

describe('CalamariService', () => {
  let service: CalamariService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalamariService],
    }).compile();

    service = module.get<CalamariService>(CalamariService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
