import { Injectable } from '@nestjs/common';

import { UserWorklogResult } from '../aggregator/interfaces/user-worklog-result.interface';

import { SlackService } from './slack/slack.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly slackService: SlackService) {
  }

  public sendToUser(workLogResult: UserWorklogResult, date: Date) {
    const dateString = date.toLocaleDateString('pl', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const message = `Cześć ${workLogResult.firstName} :wave:. Uzupełnij work log za ${dateString}. Dzięki!`;

    return this.slackService.sendToUser(message, workLogResult.email);
  }

  public sendToChannel(workLogResults: UserWorklogResult[], date: Date) {
    const dateString = date.toLocaleDateString('pl', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const message = `:warning: Brakujące work logi za *${dateString}*: \n${workLogResults
      .map(result => [`:pisiorek: ${result.firstName} ${result.lastName}`])
      .join('\n')}`;

    return this.slackService.sendToChannel(message, 'worklog-monitor-int');
  }
}
