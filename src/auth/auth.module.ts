import { Module } from '@nestjs/common';

import { GoogleTokenStrategy } from './google-token.strategy';

@Module({
  providers: [GoogleTokenStrategy],
})
export class AuthModule {}
