import { SingleFilterInput } from './single-filter-input.interface';
import { CombinedFilterInput } from './combined-filter-input.interface';

export interface FilterInput {
  combinedFilter?: CombinedFilterInput;
  singleFilter?: SingleFilterInput;
}
