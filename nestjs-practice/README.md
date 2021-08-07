<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Some useful script

```bash
$ nest new $project_name
$ nest g module $module_name
$ nest g controller $controller_name
$ nest g service $service_name
$ nest g resource $resource_name
```

## Notes

`Pipes`, `Guards`, `Interceptors` are middleware for specific jobs.

## MongoDB

To enable MongoDB on localhost, run

```bash
# add Third-Party Repositories to the lists
$ brew tap mongodb/brew
# install mongodb-community
$ brew install mongodb-community@5.0
# start the service
$ brew services start mongodb-community
```

the newest mongodb package is not compatible with typeorm.
i downgrade to `^3.0.7`

## Passport JWT

In this example, client should paste the access_token into `Bearer Token` in `Authentication Header`

There are three fields of jwt you need to know in this example:

- exp: Expiration Time
- iat: Issued at
- sub: Subject

### Workflow

Login

1. user post login with username and password
2. the login controller recieve the request
3. LocalAuthGuard check the request with local strategy
4. local strategy will use the user service to check if username and password are available
5. the login controller can access user after LocalAuthGuard authenticate
6. the login controller ask login service to create a jwt token
7. the login service create a jwt token with jwt service
8. the login controller give the jwt token to client

Me

1. client get me with the jwt token
2. the me controller recieve the request
3. the JwtAuthGuard check the request with jwt strategy
4. the jwt strategy will check if the token is signed with the secret, and if the token is expired.
5. the me controller can access user after JwtAuthGuard authenticate

## More Examples

you can find more examples in the [sample directory](https://github.com/nestjs/nest/tree/master/sample)

## Reference

https://www.youtube.com/watch?v=2n3xS89TJMI
