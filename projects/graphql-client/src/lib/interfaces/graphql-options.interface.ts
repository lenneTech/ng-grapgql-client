/**
 * Options for graphql requests
 */
import { GraphQLRequestType } from '../enums/graphql-request-type.enum';

export interface IGraphQLOptions {
  arguments?: any;
  fields?: any;
  log?: boolean;
  model?: any;
  type?: GraphQLRequestType;
}
