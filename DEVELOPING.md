## Installation

1. [Get Docker](https://docs.docker.com/get-docker/) so we can automatically run and setup Postgres
2. Make sure you have [node](https://nodejs.org/en/download/) and [yarn](https://classic.yarnpkg.com/en/docs/install) installed. `yarn -v` should be `1.x.x`. Do not get Yarn 2.
3. Run `yarn install` in this directory to get dependencies
4. Run `yarn dev:db:up` to start the database via docker. `yarn dev:db:down` will stop it.
5. Start the app in development with `yarn dev`
6. Visit the app at http://localhost:3000

## Technologies

- [Next.js](https://nextjs.org/docs/getting-started) lets us do server-side and client-side React rendering, as well as write backend API endpoints. It also gives us developer ergonomics like hot reload in dev.

- [hapi.js](https://hapi.dev) runs our backend http api. It is similar to express, but with integrated support for authentication, validation, and testing.

- [Socket.io](https://socket.io/docs/) manages websocket communication on server and client

- [Typescript](https://www.typescriptlang.org/docs/home.html) lets us write maintainable, scalable Javascript

- [Postgresql](https://www.postgresql.org/docs/11/index.html) is a very reliable and popular SQL database that is great for 99% of applications

- [TypeORM](https://typeorm.io/) lets us query Postgres easily and with Typescript validating our schema.

- [Docker](https://www.docker.com/products/docker-desktop) sets up a consistent Postgres environment on all developer's machines

## File Structure

Source code is in the `packages` folder.

`app` is a the next.js app. Routing is done using the file system. For example, the page `/app/pages/xyz.tsx` would be served at `domain.com/xyz`. Pages are rendered server-side and hydrated client side. Data fetching can happen on the server or client. [Learn more](https://nextjs.org/docs/basic-features/data-fetching)

`server` is the server that runs the REST API and websockets. Each API resource gets a router file inside `/server/api`.

`api-client` is a library to wrap network calls to the api in a neater, **type-safe** interface.

`common` is where common code and types go. It is imported into the other three packages.

The `infrastructure` folder is for docker and other deployment files. You can mostly ignore it.

## Developing

Run `yarn dev` at root level to get everything running and hot-reloading. `yarn test` at root level runs all tests, but you can also selectively run tests by running `yarn test` while inside a package. Be sure to have the db running with `yarn dev:db:up` before running dev or tests.

Your IDE should do type-checking for you. You can run type-checks manually with `yarn tsc`.

## Migrations

If you change an entity, you MUST run `yarn migration:generate`, to make the migration file, then `yarn typeorm migration:run` will automatically run on deployment to staging/production. Commit the migration file to Git!

### Adding an API Route

1. Add its request body and response types in `common`
2. Add routes to the hapi server in `server` (using the `common` types)
3. Add client functions in `api-client` calling the endpoint (using the `common` types)

### Adding to the frontend app

Every component in `pages` is served publicly. See https://nextjs.org/docs/routing/introduction. Break pages down into components and add to `components` folder.

### Testing

Integration and unit test files should be colocated with the file they test. One exception is app page tests (page folder is public, so tests can't go in there)

End to end (E2E) testing is in it's own folder and done with Cypress. These should be used to test core user flows.

If your tests are failing with a message about "deadlock something whatever", do `yarn test --run-in-band`. This makes the tests run sequentially.

### Installing new packages

Install packages from `cd` into the project you , then run `yarn add <PACKAGE>`

## Style

[Prettier](https://prettier.io/), a highly opinionated code formatter, runs right before you commit to git. So don't worry about formatting your code! Prettier will clean it all up. You can also get the Prettier extension in most IDEs, or run `yarn pretty-quick` if you want to.
