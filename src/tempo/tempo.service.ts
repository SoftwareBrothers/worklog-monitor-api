import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import * as moment from 'moment';

type WorklogItem = {
  author: {
    accountId: string;
    displayName: string;
  }
  timeSpentSeconds: number;
};

type WorklogResult = {
  self: string;
  metadata: {
    count: number;
    offset: number;
    limit: number;
    next: string;
  }
  results: WorklogItem[];
};

type ResultMap = {
  [accountId: string]: WorklogItem[]
};

const MAX_LIMIT = 1000;

const getDateString = (date: Date) => moment.default(date).format('YYYY-MM-DD');

@Injectable()
export class TempoService {
  constructor(private readonly http: HttpService) {}

  private async worklogs({ from, to }: { from: string, to: string }): Promise<WorklogItem[]> {
    try {
      return this.http
        .get<WorklogResult>('worklogs', { params: { from, to, limit: MAX_LIMIT } })
        .toPromise()
        .then(result => result.data.results);
    } catch (e) {
      throw new BadRequestException('tempo thrown error', e.message);
    }
  }

  public async worklogsForDate(date: Date): Promise<ResultMap> {
    const dateString = getDateString(date);
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
