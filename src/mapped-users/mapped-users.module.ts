import { Module } from '@nestjs/common';

import { MappedUsersService } from './mapped-users.service';

@Module({
  providers: [MappedUsersService],
  exports: [MappedUsersService],
})
export class MappedUsersModule {}
