### Basic Audio Player - GraphQl Api

Frameworks and programming languages put to use in this project:

  - graphql - A query language for APIs
  - koa2 - A web framework
  - typescript - a typed superset of JavaScript 

A list of concepts demoed:

  - inversion on control - by using inversify -> a DI container
  - repository pattern
  - domain driven development
  - functional programming - functional lenses in particular


### Running a local server

  - install project dependencies by running `yarn` [- preferred] or `npm i` 
  - start a local development server using `yarn start`
  - the graphql playground should be available at `http://localhost:3000/graphql`


### Unit Tests & Coverage Reports

the repository comes with 3 predefined test scripts:

  - `test` - runs all tests
  - `test:coverage` - delivers a coverage report in text when ran from a CLI
  - `test:watch` - runs all tests and watches for any test file changes, useful for development
  
### Implemented standards

the repository comes with a useful git hook that is meant to check that the files meant to be part of the last commit
allow the same standards as the rest of the project.

This is achieved by making use of

  - `tslint` a tool that reports on breaches of the currently defined standards in tslint.json
  - `lint` a predefined script that runs tslint with some predefined options
  - `test:staged` a predefined script that runs unit tests related to files staged for commit
  
### Current state of development and future tasks:

#### Storage

Song Metadata:
  - the api currently has a base of 4 predefined songs being stored in memory and served locally,
   song metadata is stored in `src/repositories/local/fixtures/songData.ts`
  - TBD: use a graphql dataSource to retrieve metadata from a 3rd party, an `apollo-datasource-rest` would allow http calls and server caching on remote calls
  - TBD: switch local repositories for mongodb ones (only minor progress made on that part), can be switched from `src/repositories/index.ts`

Songs (audio files):
  - the 4 predefined songs have a url attached with credentials from a public amazon s3 bucket
  - TBD: StoreSong mutation

User:
  - authentication/a identity service should be provided through a `Bearer` header set on requests,
  currently the header decoder is in place, but missing a public encryption key that would correspond to the authentication server,
  meanwhile the user is hardcoded to always be a predefined one.
  - TBD: store & retrieve user information from mongoDb  
  - TBD: add docker-compose file for local development server dependencies  

#### Actions

- a song can be played/paused/stopped using the graphql corresponding mutations
- current songs can be retrieved using the graphql corresponding query, pagination and sorting are declared, but not implemented
- viewer query - can be used to find out more info about the currently connected user
- song query - can be used to find out more info about the song currently being played/paused/stopped
- TBD: StoreUser mutation - create a new user -> should only be used by the authentication server
- TBD: StoreSong mutation - upload a new song: should upload file to s3 and set an api address for retrieving metadata if none can be provided
