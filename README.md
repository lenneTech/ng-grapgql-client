# NgGraphqlClient

Angular GraphQL Client by [lenne.Tech](https://lenne.tech) is a library for [Angular](https://angular.io/) to communicate with a server via [GraphQL](https://graphql.org/) using [Apollo Angular](https://apollo-angular.com/docs/).

To use this library, an [Apollo Server](https://www.apollographql.com/docs/apollo-server/) is required. If you don't use a server with such an API yet, we recommend our [lenne.Tech Nest Server](https://github.com/lenneTech/nest-server), 
which you can set up conveniently with our [Starter](https://github.com/lenneTech/nest-server-starter).

This extension contains the following features:
- GraphQL service and elements for easy communication with GraphQL API (via Models)
- Standard Model with methods for mapping, cloning and comparing models
- Basic User Model with basic rights handling
- Authentication service for user registration
- Loading Service for the subscription of loading processes
- Storage Service for comfortable saving of data in local storage
- and much more

## Requirements

- [Angular Project (Version 11)](https://angular.io/tutorial/toh-pt0)

## Integration into an Angular project

Installation
```bash
cd path/to/your/angular-project
npm i @lenne.tech/ng-graphql-client
```

Integration in your App Module (`src/app/app.module.ts`):

```typescript
import { GraphQLModule } from '@lenne.tech/ng-graphql-client'
@NgModule({
  imports: [
      GraphQLModule.forRoot({
        apiUrl: 'https://url.to-your.domain/api',
        version: 'versionForLocalStorageKeys',
        prefix: 'prefixForLocalStorageKeys'
      })
  ],
})
```

## Extend this library

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Test the package

```bash
npm run pack
```

Afterwards, the package can be included in an Angular project as follows in the `package.json` on a test basis:
```json
{
  "dependencies": {
    "@lenne.tech/ng-graphql-client": "file:/PATH_TO_PROJECT/ng-graphql-client/dist/graphql-client/lenne.tech-ng-graphql-client-0.1.7.tgz"
  }
}
```

## Publish

Update version in `projects/graphql-client/package.json` and `projects/graphql-client/package-lock.json`.

After that, the new package can be published as follows:
```bash
npm run publish
```

