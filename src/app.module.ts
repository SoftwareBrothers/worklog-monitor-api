import * as path from 'path';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ConfigModule } from 'nestjs-config';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
