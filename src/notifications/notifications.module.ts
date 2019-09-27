import { Module } from '@nestjs/common';

import { AggregatorModule } from '../aggregator/aggregator.module';

import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { SlackService } from './slack/slack.service';

@Module({
  imports: [AggregatorModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, SlackService],
})
export class NotificationsModule {
}
