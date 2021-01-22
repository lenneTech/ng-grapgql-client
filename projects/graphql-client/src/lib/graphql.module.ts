import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { GraphQLService } from './services/graphql.service';
import { AuthService } from './services/auth.service';
import { MODULE_CONFIG, ModuleConfig } from './interfaces/module-config.interface';

export function createApollo(moduleConfig: ModuleConfig, httpLink: HttpLink, authService: AuthService) {
  const link = httpLink.create({
    uri: moduleConfig.apiUrl,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const headers: any = {};
    if (localStorage) {
      const token = authService.token || null;
      if (token) {
        headers.Authorization = 'Bearer ' + token;
      }
      operation.setContext(() => ({ headers }));
    }
    return forward(operation);
  });

  return {
    link: ApolloLink.from([authMiddleware, link]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
    },
  };
}

@NgModule({
  exports: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [MODULE_CONFIG, HttpLink, AuthService],
    },
    GraphQLService,
  ],
})
export class GraphQLModule {
  static forRoot(moduleConfig: ModuleConfig): ModuleWithProviders<GraphQLModule> {
    return {
      ngModule: GraphQLModule,
      providers: [
        {
          provide: MODULE_CONFIG,
          useValue: moduleConfig,
        },
      ],
    };
  }
}
