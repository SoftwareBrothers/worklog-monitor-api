import { HttpModule, Module } from '@nestjs/common';

import { CalamariService } from './calamari.service';
import { CalamariConfig } from './calamari.config';

@Module({
  imports: [HttpModule.registerAsync({
    useClass: CalamariConfig,
  })],
  exports: [CalamariService],
  providers: [CalamariService],
})

export class CalamariModule {}
