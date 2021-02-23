import { LogicalOperatorEnum } from './../enums/logical-operator.enum';
import { FilterInput } from './filter-input.interface';

export interface CombinedFilterInput {
  logicalOperator?: LogicalOperatorEnum;
  filters?: FilterInput[];
}
