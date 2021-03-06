import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

import { AppController } from './app.controller';
import { MappedUsersModule } from './mapped-users/mapped-users.module';
import { TempoModule } from './tempo/tempo.module';
import { CalamariModule } from './calamari/calamari.module';
import { AggregatorService } from './aggregator/aggregator.service';
import { AggregatorModule } from './aggregator/aggregator.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    MappedUsersModule,
    TempoModule,
    CalamariModule,
    AggregatorModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AggregatorService],
})
export class AppModule { }
