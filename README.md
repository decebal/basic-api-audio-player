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
  
