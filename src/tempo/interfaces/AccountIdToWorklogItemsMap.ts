import { WorklogItem } from './WorklogItem.interface';

export interface AccountIdToWorklogItemsMap {
  [accountId: string]: WorklogItem[];
}
