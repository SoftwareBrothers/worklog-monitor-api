import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

import { AppController } from './app.controller';
import { TempoModule } from './tempo/tempo.module';
import { CalamariModule } from './calamari/calamari.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TempoModule,
    CalamariModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
