import { TimeSheetEntryAuthor } from './TimeSheetEntryAuthor.interface';

export interface TimeSheetEntry {
  id: number;
  started: Date;
  person: TimeSheetEntryAuthor;
}
