import { Module } from '@nestjs/common';

import { TempoModule } from '../tempo/tempo.module';
import { CalamariModule } from '../calamari/calamari.module';
import { MappedUsersModule } from '../mapped-users/mapped-users.module';

import { AggregatorService } from './aggregator.service';
import { AggregatorController } from './aggregator.controller';

@Module({
  imports: [TempoModule, CalamariModule, MappedUsersModule],
  providers: [AggregatorService],
  controllers: [AggregatorController],
})
export class AggregatorModule {}
