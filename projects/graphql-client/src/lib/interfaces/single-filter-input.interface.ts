import { ComparisonOperatorEnum } from './../enums/comparison-operator.enum';

export interface SingleFilterInput {
  field: string;
  not?: boolean;
  operator: ComparisonOperatorEnum;
  options?: string;
  value: any;
}
