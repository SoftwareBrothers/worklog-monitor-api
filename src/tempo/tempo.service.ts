import { BadRequestException, HttpService, Injectable } from '@nestjs/common';

import DateTimeUtils from '../utils/DateTimeUtils';

import { WorklogItem } from './interfaces/WorklogItem.interface';
import { WorklogResult } from './interfaces/WorklogResult.interface';
import { AccountIdToWorklogItemsMap } from './interfaces/AccountIdToWorklogItemsMap';
import { WorklogInput } from './interfaces/WorklogInput.interface';

@Injectable()
export class TempoService {
  constructor(private readonly http: HttpService) {}

  private readonly MAX_LIMIT = 1000;

  private async worklogs({ from, to }: WorklogInput): Promise<WorklogItem[]> {
    return this.http
      .get<WorklogResult>('worklogs', { params: { from, to, limit: this.MAX_LIMIT } })
      .toPromise()
      .then(result => result.data.results)
      .catch((err) => {
        throw new BadRequestException('tempo thrown error', err.message);
      });
  }

  public async worklogsForDate(date: Date): Promise<AccountIdToWorklogItemsMap> {
    const dateString = DateTimeUtils.getDateString(date);
    const worklogs = await this.worklogs({ from: dateString, to: dateString });

    return worklogs.reduce((result, worklogItem) => {
      const { author: { accountId } } = worklogItem;
      const newResult = { ...result };

      if (result[accountId]) {
        newResult[accountId].push(worklogItem);
      } else {
        newResult[accountId] = [worklogItem];
      }

      return newResult;
    }, {});
  }
}
