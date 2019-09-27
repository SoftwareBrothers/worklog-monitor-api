import { WorklogMetadata } from './WorklogMetadata.interface';
import { WorklogItem } from './WorklogItem.interface';

export interface WorklogResult {
  self: string;
  metadata: WorklogMetadata;
  results: WorklogItem[];
}
