import { WorklogItem } from '../../tempo/interfaces/WorklogItem.interface';

export interface UserWorklogResult {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly worklogs: WorklogItem[];
}