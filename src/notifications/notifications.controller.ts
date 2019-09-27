import { Controller, Post, Query } from '@nestjs/common';

import { UserWorklogResult } from '../aggregator/interfaces/user-worklog-result.interface';
import { AggregatorService } from '../aggregator/aggregator.service';
import { CalamariService } from '../calamari/calamari.service';

import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly aggregatorService: AggregatorService,
    private readonly calamariService: CalamariService,
    private readonly notificationsService: NotificationsService,
  ) {
  }

  @Post('/slack/to-users')
  public async sendNotificationsToUsers(@Query('date') date: string) {
    const lastWorkingDate = await this.calamariService.previousWorkingDay(new Date(date));
    const users: UserWorklogResult[] = await this.aggregatorService.aggregate(lastWorkingDate);
    const lazyUsers = users.filter(user => !user.worklogs.length);

    lazyUsers.forEach(workLogResult => this.notificationsService.sendToUser(workLogResult, lastWorkingDate));
  }

  @Post('/slack/to-channel')
  public async sendNotificationToChannel(@Query('date') date: string) {
    const lastWorkingDate = await this.calamariService.previousWorkingDay(new Date(date));
    const users: UserWorklogResult[] = await this.aggregatorService.aggregate(lastWorkingDate);

    const lazyUsers = users.filter(user => !user.worklogs.length);

    await this.notificationsService.sendToChannel(lazyUsers, lastWorkingDate);
  }
}
