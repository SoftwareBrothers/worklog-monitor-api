import {
  Controller, Get, Query, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AggregatorService } from './aggregator.service';
import { UserWorklogResult } from './interfaces/user-worklog-result.interface';

@Controller('aggregator')
export class AggregatorController {
  constructor(private readonly aggregatorService: AggregatorService) {}

  @UseGuards(AuthGuard('google-token'))
  @Get('worklogs')
  public async aggregate(@Query() date: Date): Promise<UserWorklogResult[]> {
    return this.aggregatorService.aggregate(date);
  }
}
