import { IGraphQLOptions } from './graphql-options.interface';

export interface IGraphQLPlusOptions extends IGraphQLOptions {
  excludedErrors?: string | string[];
  loading?: boolean;
}
