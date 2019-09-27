import { WorklogAuthor } from './WorklogAuthor.interface';

export interface WorklogItem {
  author: WorklogAuthor;
  timeSpentSeconds: number;
}
