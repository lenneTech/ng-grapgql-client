import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphQLService } from './graphql.service';
import { GraphQLMetaService } from './graphql-meta.service';
import { IGraphQLPlusOptions } from '../interfaces/graphql-plus-options.interfacen';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class GraphQLPlusService extends GraphQLService {
  /**
   * Include services
   */
  constructor(
    protected apollo: Apollo,
    protected graphqlMetaService: GraphQLMetaService,
    protected loaderService: LoaderService
  ) {
    super(apollo, graphqlMetaService);
  }

  public graphQl(graphql: string, options: IGraphQLPlusOptions = {}): Observable<any> {
    this.handleLoader('start', options);

    return new Observable((subscriber) => {
      super.graphQl(graphql, options).subscribe(
        (response) => {
          if (response && response.errors) {
            this.handleError(response.errors, options.excludedErrors);
            subscriber.error(response);
            this.handleLoader('stop', options);
            subscriber.complete();
          }

          subscriber.next(response);
          this.handleLoader('stop', options);
          subscriber.complete();
        },
        (error) => {
          this.handleError(error, options.excludedErrors);
          subscriber.error(error);
          this.handleLoader('stop', options);
          subscriber.complete();
        }
      );
    });
  }

  handleLoader(state: 'start' | 'stop', options: IGraphQLPlusOptions) {
    if (options.loading) {
      if (state === 'start') {
        this.loaderService.start();
      } else if (state === 'stop') {
        this.loaderService.stop();
      }
    }
  }

  handleError(error: Error, excludedErrors: any = null) {
    if (excludedErrors) {
      if (Array.isArray(excludedErrors)) {
        excludedErrors.forEach((excludedError) => {
          if (error.message.includes(excludedError.toLowerCase())) {
            return;
          }
        });
      } else if (error.message.toLowerCase().includes(excludedErrors?.toLowerCase())) {
        return;
      }
    }

    this.displayError(error);
  }

  displayError(error: any) {
    console.error(error);
  }
}