import { Module } from '@nestjs/common';

import { TempoModule } from '../tempo/tempo.module';
import { CalamariModule } from '../calamari/calamari.module';

import { AggregatorService } from './aggregator.service';
import { AggregatorController } from './aggregator.controller';

@Module({
  imports: [TempoModule, CalamariModule],
  providers: [AggregatorService],
  controllers: [AggregatorController],
})
export class AggregatorModule {}
