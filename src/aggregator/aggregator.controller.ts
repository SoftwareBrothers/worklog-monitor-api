import { Controller, Get, Query } from '@nestjs/common';

import { AggregatorService } from './aggregator.service';
import { UserWorklogResult } from './interfaces/user-worklog-result.interface';

@Controller('aggregator')
export class AggregatorController {
  constructor(private readonly aggregatorService: AggregatorService) {}

  @Get()
  public async aggregate(@Query() date: Date): Promise<UserWorklogResult[]> {
    return this.aggregatorService.aggregate(date);
  }
}
