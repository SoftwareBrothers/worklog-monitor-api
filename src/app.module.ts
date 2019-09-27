import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

import { AppController } from './app.controller';
import { MappedUsersModule } from './mapped-users/mapped-users.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    MappedUsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
