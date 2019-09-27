import { HttpModule, Module } from '@nestjs/common';

import { TempoService } from './tempo.service';
import { TempoConfig } from './tempo.config';

@Module({
  imports: [HttpModule.registerAsync({
    useClass: TempoConfig,
  })],
  exports: [TempoService],
  providers: [TempoService],
})
export class TempoModule {}
