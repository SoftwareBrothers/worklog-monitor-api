import { Test, TestingModule } from '@nestjs/testing';

import { AggregatorController } from './aggregator.controller';

describe('Aggregator Controller', () => {
  let controller: AggregatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AggregatorController],
    }).compile();

    controller = module.get<AggregatorController>(AggregatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
