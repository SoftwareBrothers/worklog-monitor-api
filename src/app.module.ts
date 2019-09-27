import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

import { AppController } from './app.controller';
import { TempoModule } from './tempo/tempo.module';
import { CalamariModule } from './calamari/calamari.module';
import { AggregatorService } from './aggregator/aggregator.service';
import { AggregatorModule, AggregatorModule } from './aggregator/aggregator.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TempoModule,
    CalamariModule,
    AggregatorModule,
  ],
  controllers: [AppController],
  providers: [AggregatorService],
})
export class AppModule { }
