import { IGraphQLOptions } from './graphql-options.interface';

export interface IGraphQLPlusOptions extends IGraphQLOptions {
  ignoreErrors?: boolean;
  excludedErrors?: string | string[];
  loading?: boolean;
}
