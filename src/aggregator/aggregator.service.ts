import { Injectable } from '@nestjs/common';

import { CalamariService } from '../calamari/calamari.service';
import { MappedUsersService } from '../mapped-users/mapped-users.service';
import { TempoService } from '../tempo/tempo.service';
import { Person } from '../calamari/interfaces/Person.interface';
import { AccountIdToWorklogItemsMap } from '../tempo/interfaces/AccountIdToWorklogItemsMap';

import { UserWorklogResult } from './interfaces/user-worklog-result.interface';

type PresentPeopleReduceFunc = (personResultArray: UserWorklogResult[], person: Person) => UserWorklogResult[];

@Injectable()
export class AggregatorService {
  constructor(
    private readonly calamariService: CalamariService,
    private readonly mappedUsersService: MappedUsersService,
    private readonly tempoService: TempoService,
  ) { }

  private getPersonResult(worklogs: AccountIdToWorklogItemsMap): PresentPeopleReduceFunc {
    return (personResultArray, person) => {
      const userFromDictionary = this.mappedUsersService.getUserByEmailAddress(person.email);
      if (userFromDictionary) {
        personResultArray.push({
          ...person,
          worklogs: worklogs[userFromDictionary.accountId] || [],
        });
      }

      return personResultArray;
    };
  }

  public async aggregate(date: Date): Promise<UserWorklogResult[]> {
    const yesterdayPresentPeople = await this.calamariService.presentPeople(date);
    const worklogs = await this.tempoService.worklogsForDate(date);

    return yesterdayPresentPeople.reduce(this.getPersonResult(worklogs), []);
  }
}
