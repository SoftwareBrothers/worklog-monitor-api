import { Test, TestingModule } from '@nestjs/testing';

import { AggregatorService } from './aggregator.service';

describe('AggregatorService', () => {
  let service: AggregatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AggregatorService],
    }).compile();

    service = module.get<AggregatorService>(AggregatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
