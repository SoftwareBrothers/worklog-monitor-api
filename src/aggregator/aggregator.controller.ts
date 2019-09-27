import { Controller, Get } from '@nestjs/common';

import { AggregatorService } from './aggregator.service';

@Controller('aggregator')
export class AggregatorController {
  constructor(private readonly aggregatorService: AggregatorService) {}

  @Get()
  public async aggregate() {
    return this.aggregatorService.aggregate();
  }
}
