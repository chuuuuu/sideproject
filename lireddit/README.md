# FullStack Tutorial

This is a practice followed by the tutorial released by Ben Awad [link](https://www.youtube.com/watch?v=I6ypD7qv3Z8)

## NPM

- `dependencies`: Packages required by your application in production.
- `devDependencies`: Packages that are only needed for local development and testing.

To save packages into `dependencies`, you can run

```
npm install --save ${package}
```

To save packages into `devDependencies`, you can run

```
npm install --save-dev ${package}
```

To save packages globally, you can run

```
npm install -g ${package}
```

## Node/Typescript Setup

### packages

- `typescript`: This is a language for application-scale JavaScript.
- `ts-node`: This is a TypeScript execution engine and REPL for Node.js
- `@types/node`: This contains type definitions for Node.js
- `nodemon`: This is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected

You can simply run the following script to install all of them

```
npm install --save-dev typescript ts-node @types/node nodemon
```

### scripts

To initialize `tsconfig.json`, you can run

```
npx tsconfig.json
```

To run the typescript program, you can run

```
ts-node src/index.ts
```

To re-compile the typescript files into javascript files automatically after files change, you can run

```
tsc -w
```

to re-run the javascript program automatically after files change, you can run

```
nodemon dist/index.js
```

With the two scripts above, you can run the typescript program automatically.

Or you can simply run

```
nodemon --exec ts-node src/index.ts
```

## MikroORM Setup

TypeScript ORM for Node.js based on Data Mapper, Unit of Work and Identity Map patterns.

### PostgreSQL

The World's Most Advanced Open Source Relational Database.

To install postgresql, you can run

```
brew install postgresql
```

To use `Postgres.app`, a beautiful user interface, you can download it from this [site](https://postgresapp.com).

After finishing the installation of `Postgres.app`, you can click on the `Initialize` button. Then, your postgresql server will start.

### packages

- `@mikro-orm/cli`
- `@mikro-orm/core`
- `@mikro-orm/migrations`: migrations is like the github of database which is used for version control
- `@mikro-orm/postgresql`
- `pg`: Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.

To install them, you can run

```
npm install --save @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgresql pg
```

### scripts

To create a database, you can run

```
createdb lireddit
```

## Apollo Server Express Setup

### packages

- `express`: Fast, unopinionated, minimalist web framework for node.
- `@types/express`
- `apollo-server-express`: Apollo Server is a community-maintained open-source GraphQL server that works with many Node.js HTTP server frameworks.
- `graphql`: GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.
- `type-graphql`

To install those package you can run

```
npm install --save express @types/express apollo-server-express graphql type-graphql
```

### apolloServer

after you start you apolloServer, you can go to the graphql playground

## MikroORM TypeGraphQL CRUD

In this part, we create a post resolver. Also, we implement the CRUD of post. You can simply visit `http://localhost:{port}/graphql`, and look at the schema and docs. Then you can write some query to interact with the database.

#### CRUD

- `C`: Create
- `R`: Read
- `U`: Update
- `D`: Delete

## Register Resolver

In this part, we create a User entity, and a new migration to record the changes of database. After that, we create a user resolver which provide the register function.

### packages

- argon2: Argon2 is a password-hashing function that summarizes the state of the art in the design of memory-hard functions and can be used to hash passwords for credential storage, key derivation, or other applications.

### script

to create migration file, you can simply run

```
mikro-orm migration:create
```

or you can run the nodejs code

```
await migrator.createMigration();
```

## Login Resolver

In this section, we use `ObjectType` to define `FieldError` and `UserResponse`

```
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
```

Then, we can use send the error message in the `[FieldError]` of `UserResponse` if there's invalid manipulation.

## Session Authentication

In this section, we use session.userId to identify if a user is authenticated

### packages

- `redis`: A high performance Node.js Redis client.
- `connect-redis`: provides Redis session storage for Express.
- `express-session`: Create a session middleware with the given options.
- `@types/redis`
- `@types/express-session`
- `@types/connect-redis`

```
npm install --save redis connect-redis express-session @types/redis @types/express-session @types/connect-redis
```

### redis

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.

You can follow the instruction in the official website to install & execute redis on your computer.

see more [https://redis.io/download](https://redis.io/download)

To run your redis server, you should run

```
src/redis-server
```

### intersection type

`&` appears to be an intersection type literal. A value of an intersection type A & B is a value that is both of type A and type B.

```
interface A { a: number }
interface B { b: number }

var ab: A & B = { a: 1, b: 1 };
var a: A = ab;  // A & B assignable to A
var b: B = ab;  // A & B assignable to B
```

- reference: https://stackoverflow.com/questions/33875609/typescript-operator

In this section, we re-define the `MyContext` type, with operator `&`.

```
export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session & { userId?: number } };
  res: Response;
};
```

### scripts

follow the steps to see if you are logging

1. set `"request.credentials"` to `"include"` in graphql UI setting
2. press `option` + `command` + `c` to open development tool
3. open `Application` -> `Storage` -> `Cookies`

now, you can see the session data store by server

## Session

how session works in this project?

1. after setting `req.session.userId = user.id;`, server will send `{ userId: user.id }` to redis
2. redis will store the data with a key, `sess:qwoeiuowqjoqjw`
3. redis send the key back to server
4. `express-session` will set a cookie on the client's browser `qwoieu9012798quw9euoe1i2uo`
5. when user makes a request sent cookie `qwoieu9012798quw9euoe1i2uo` to the server
6. server decrypts the cookie `qwoieu9012798quw9euoe1i2uo` into session key `sess:qwoeiuowqjoqjw`
7. server makes a request with key to redis
8. redis gives `{ userId: user.id }` back to server

## Next.js + Chakra

### packages

- `next`: The React Framework for Production
- `chakra-ui/react`: Chakra UI is made up of multiple components and tools which you can import one by one.
- `chakra-ui/icons`: Chakra provides multiple ways to use icons in your project:
- `formik`: Formik is the world's most popular open source form library for React and React Native.

### Next.js

Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.

#### pages

In Next.js, a page is a React Component exported from a `.js`, `.jsx`, `.ts`, or `.tsx` file in the pages directory. Each page is associated with a route based on its file name.

Example: If you create `pages/about.js` that exports a React component like below, it will be accessible at `/about`.

```
function About() {
  return <div>About</div>
}

export default About
```

#### rendering

Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.

- `Static Generation (Recommended)`: The HTML is generated at build time and will be reused on each request.
- `Server-side Rendering`: The HTML is generated on each request

see more [site](https://nextjs.org/docs/basic-features/pages#two-forms-of-pre-rendering)

#### Custom `App`

Next.js uses the `App` component to initialize pages. You can override it and control the page initialization.

see more [site](https://nextjs.org/docs/advanced-features/custom-app)

#### Custom `Document`

A custom `Document` is commonly used to augment your application's `<html>` and `<body>` tags. This is necessary because Next.js pages skip the definition of the surrounding document's markup.

see more [site](https://nextjs.org/docs/advanced-features/custom-document)

### Chakra

Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.

### scripts

To create a next project with chakra, you can use

```
npx create-next-app --example with-chakra-ui {projectName}
```

To start the development mode, using

```
npm run dev
```

## URQL Basics

### packages

- client-side packages
  - `urql`: The highly customizable and versatile GraphQL client for React, Svelte, Vue, or plain JavaScript, with which you add on features like normalized caching as you grow.
  - `graphql`
- server-side packages
  - `cors`: CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
  - `@types/cors`

To install the packages, run

```shell
# in client folder
npm install --save urql graphql

# in server folder
npm install --save cors @types/cors
```

### CORS (Cross-Origin Resource Sharing)

When you access to server directly, you probably would get this error message

```
Access to fetch at `http://localhost:4000/graphql` from origin `http://localhost:3000` has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
```

and you can solve this problem by set `cors: { origin: "http://localhost:3000", credentials: true },` in the middleware

## GraphQL Code Generator

`graphql-codegen` will generate a custom hook with well-defined types. Hence, you can write code with auto-suggestion, and make less mistake

### packages

- `@graphql-codegen/cli`: Generate code from your GraphQL schema and operations with a simple CLI

To install it, run

```
npm install --save-dev @graphql-codegen/cli
```

### scripts

To initialize `graphql-codegen`, there few steps to do

#### step 1

run the script

```
npx graphql-codegen init
```

#### step 2

fill up the configuration

```
    Welcome to GraphQL Code Generator!
    Answer few questions and we will setup everything for you.

? What type of application are you building?
> Application built with React
? Where is your schema?: (path or url)
> http://localhost:4000/graphql
? Where are your operations and fragments?:
> src/graphql/**/*.graphql
? Pick plugins:
> TypeScript (required by other typescript plugins), TypeScript Ope
rations (operations and fragments), TypeScript React Apollo (typed components and
 HOCs)
? Where to write the output:
> src/generated/graphql.tsx
? Do you want to generate an introspection file?
> No
? How to name the config file?
> codegen.yml
? What script in package.json should run the codegen?
> gen
Fetching latest versions of selected plugins...

    Config file generated at codegen.yml

      $ npm install

    To install the plugins.

      $ npm run gen

    To run GraphQL Code Generator.
```

after initialization, there's a `codegen.yml` file in the client folder

#### step 3

since we are using `typescript-urql`, but not `typescript-react-apollo`, we will do some slight changes

- modify `typescript-react-apollo` to `typescript-urql` in `codegen.yml`
- delete the package `"@graphql-codegen/typescript-react-apollo"` in `package.json`

#### step 4

install the package `@graphql-codegen/typescript-urql` by running

```
npm install --save-dev @graphql-codegen/typescript-urql
```

## Register Error Handling

In this part, we are dealing with error of register

### some notes

To make sure compiler is checking wheather you have put `?` behind your possibly undefined object, set `"strict": true` in `tsconfig.json`

## Navbar

In this part, we build a navbar.

## URQL Cache Updates

`urql` using document cache by default. With `Document Caching`, our me-query will use cached data after we register or logged in. As a result, data of me-query will be `null`. In this part, we solve this problem with `Normalized Caching`

### packages

- `@urql/exchange-graphcache`: The `@urql/exchange-graphcache` package contains an addon cacheExchange for urql that may be used to replace the default `cacheExchange`, which switches `urql` from using `"Document Caching"` to `"Normalized Caching"`.

To install this package, run

```
npm install --save @urql/exchange-graphcache
```

### Document Caching

By default, urql uses a concept called Document Caching. It will avoid sending the same requests to a GraphQL API repeatedly by caching the result of each query.

see more [link](https://formidable.com/open-source/urql/docs/basics/document-caching/)

### Normalized Caching

Normalized caches can enable more sophisticated use-cases, where different API requests update data in other parts of the app and automatically update data in our cache as we query our GraphQL API.

see more [link](https://formidable.com/open-source/urql/docs/graphcache/normalized-caching/)

### Fragments

GraphQL includes reusable units called fragments. Fragments let you construct sets of fields, and then include them in queries where you need to.

see more [link](https://graphql.org/learn/queries/)

## Next.js URQL SSR

### packages

- `next-urql`: A set of convenience utilities for using urql with NextJS.
- `react-is`: This package allows you to test arbitrary values and see if they're a particular React element type.

To install those packages, run

```
npm install --save next-urql react-is
```

### server-side-rendering

how ssr works:

1. user browse (http://localhost:3000)
2. send request to next.js server
3. next.js server send request graphql server (http://localhost:4000)
4. building HTML
5. sending back to your browser

#### some notes

- one of the most important reason to use ssr is to be searched by google
- if you visit non-ssr page first (in this example, login or register page), next server wont do ssr for you, even if you visit ssr page later (in this example, index page).
- next server wont know your cookie, hence we can cancel the query related to cookie when using ssr
- to determine if ssr, check on `typeof window`

## Forgot Password

In this part, we using email to help user reset their password

### packages

- nodemailer
- @types/nodemailer
- uuid
- ioredis: A robust, performance-focused and full-featured Redis client for Node.js.

To install them, run

```shell
npm install --save nodemailer uuid ioredis
npm install --save-dev @types/uuid @types/ioredis @types/nodemailer

# we are using ioredis as redis client now.
npm remove redis @types/redis
```

### notes

- redis is hard to use, ioredis is easily to use
- nextjs convention: if you want to add variable in your url, use `[]` to quote your variable
  - e.g. `[token].tsx`

## TypeOrm

since it is more convinence to use typeorm than mikro-orm, we switch to typeorm

### packages

- typeorm

```
npm install --save typeorm
```

also you can uninstall mikro-orm now

### notes

we need reflect-metadata to run typeorm

## Many to One / One to Many

Many-to-one / one-to-many is a relation where A contains multiple instances of B, but B contains only one instance of A.

see more [site](https://typeorm.io/#/many-to-one-one-to-many-relations)

### MiddlewareFn

By using middlewares you can extract the common used code from your resolvers and then just declaratively attach it using decorator or even register globally.

For example, you can use it as authentication.
see more [site](https://typegraphql.com/docs/0.16.0/middlewares.html)

## Global Error Handling

in this [article](https://formidable.com/open-source/urql/docs/architecture/), we can understand how `urql` works, and what `operation`, `result` and `exchange` is in `urql`.

also they provides lots of exchanges, such as [error exchange](https://formidable.com/open-source/urql/docs/api/core/#errorexchange) which is used for global error handling.

## Next.js Query Params

see more [link](https://nextjs.org/docs/routing/dynamic-routes)

## URQL Pagination Start

In general, we prefer to use cursor pagination.

### Offset Pagination

If you are using offset pagination, the sql would looks like

```
SELECT * FROM table
ORDER BY timestamp
OFFSET 10
LIMIT 5
```

### Cursor Pagination

If you are using cursor pagination, the sql would looks like

```
SELECT * FROM table
WHERE cursor > timestamp
ORDER BY timestamp
LIMIT 5
```

here's are list of benefits to use cursor pagination

- Superior Real-Time Data Capabilities
- No Skipped Data

see more [link](https://uxdesign.cc/why-facebook-says-cursor-pagination-is-the-greatest-d6b98d86b6c0)

### Query Builder

you can use query builder to build your custom sql
see more [link](https://typeorm.io/#/select-query-builder)

## Mock data

In this section, we generate mock posts by following steps

1. visit [mockaroo](https://www.mockaroo.com/) and fill up what kind of data do you want for each column

for example

| Field Type  | Type        | Options                       |
| ----------- | ----------- | ----------------------------- |
| title       | Movie Title |
| text        | Paragraphs  | at least 1 but no more than 3 |
| "creatorId" | Custom List | 1 / random                    |

2. click on `sql`, and download the fake datas
3. use following command to create migration

```
npx typeorm migration:create -n FakePosts
```

4. paste the query into migration
5. run migration with your typeorm client

## Chakra Styling

In this part, we use element provided by chakra to show the posts.

### notes

- `data!`
  - we can use `!` to tell typescript that data is not `undefined`
- field resolver
  - we can use field resolver to create new field

## More URQL Pagination

In this section, we modify the code of `simplePagination`.

[click here to see the source code](https://github.com/FormidableLabs/urql/blob/42b52ca45c5ab84ffd1a66e486e373a5d8721c27/exchanges/graphcache/src/extras/simplePagination.ts)

## Fix Mock Data

In this section, we append `"createdAt"` column into our mock data.

| Field Type | Type     | Options                                        |
| ---------- | -------- | ---------------------------------------------- |
| "createAt" | Datetime | 07/26/2020 to 07/26/2021 format: ISO 8601(UTC) |

## URQL Pagination Has More

In this step, we complete the pagination. also we create a new graphql object type. in that type, we tell frontend if there's more data you can load.

## GraphQL Fetching Relationships

In this section, we write our own sql to load post with user data

## GraphQL Field Permissions

We can use `FieldResolver` to decide overwrite the field, and return the field depends on different situation.

## Many to Many

In this section, we create a new entity `Updoot` used for represent the `Many to Many` relationship between `Post` and `User`.

we will record who like / dislike which post in each updoot object.

hence, both a post and a user can have a lot of upvote

however, an upvote can only own one post and one user

## Invalidate Queries

In this section, we use `invalidate` method to delete the cache after create new posts.

## Upvote UI

In this section, we use `IconButton` and the icon provided by `chakra-ui` to build updoot and downdoot button

## Change Vote

In this section, we update updoot and the point of post if the updoot already exist

## Change Vote

In this section, we update our cache by using `graphql-tag`, `readFragment` and `writeFragment`

### packages

- `graphql-tag`: Helpful utilities for parsing GraphQL queries. Includes: gql A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.

[see more](https://www.apollographql.com/docs/react/performance/babel)

### Babel

Babel is used to compile the code into javascript, and `graphql-tag` use babel to compile the query into Graphql AST before runtime

### Graphql AST

You can think AST(abstract syntax tree) as an object that can improve the process time. Hence, we'd better compile it into AST in compiling time, or you'll need to spend more time in the processing time.

## Vote Status

In this section, we use a new field `voteStatus` to tell frontend if user has already updoot or downdoot.

## SSR Cookie Forwarding

Since, we are using server side rendering, we need to tell nextjs server what's our cookie. Otherwise, nextjs server wont know the cookie and cannot pass it to the server.

### server side rendering v.s. client side rendering

- ssr
  - browser -> next.js -> graphql api
- client side
  - browser -> graphql api

## Single Post

In this section, we build a new page, that people can visit and see the complete article. Also, we use the keyword `relations` to load creator of the post easily.

However, here we leave a bug. After we visit the single post page, we will fetch post data from graphql directly, but we haven't give the vote status to user for post mutation yet.

## Delete Post

In this section, we implement the delete post function. however, we are using foreign key between post and updoot. Hence, we need to delete the updoot related to the post deleted. With typeorm, it provides `CASCADE` to help us do this automatically.

### Warning

Keep in mind - great power comes with great responsibility. Cascades may seem like a good and easy way to work with relations, but they may also bring bugs and security issues when some undesired object is being saved into the database. Also, they provide a less explicit way of saving new objects into the database.
see more [site](https://orkhan.gitbook.io/typeorm/docs/relations#cascades)

## Edit Post

In this section, we implement the update post function.

## Dataloader

### packages

- `dataloader`: DataLoader is a generic utility to be used as part of your application's data fetching layer to provide a simplified and consistent API over various remote data sources such as databases or web services via batching and caching.

see more [link](https://github.com/graphql/dataloader)

### N+1 problem

Suppose you have two class, `Car` and `Wheel`, and every `Car` owns 4 `Wheel`. If you want to query a collection of `Car` with coresponding `Wheel`, you can write a single query to load all of them from the database server. However, orm will ask N + 1 queries to get all of them. This is so called `N+1 Problem`

see more [link](https://stackoverflow.com/questions/97197/what-is-the-n1-selects-problem-in-orm-object-relational-mapping)

### reset cache

In this section, we reload the page when user logout. Also, invalidate all posts after user login. As the result, urql client will fetch the post data for the user logged in again.

## deploy backend

### deployment

we use dokku to deploy our backend service to vps (virtual private server), and we use digitalocean as our vps.

### steps

1. create account on digitalocean. (you might need to prepay $5)
2. create a new project, and create a new droplet for it.
3. select on `Marketplace`
4. search keyword for `dokku`
5. select on some option you want
6. better to use ssh key
7. follow the instruction `ssh-keygen` given by the page, and get your public ssh key
8. after you create a droplet, you can get your ipv4 address
9. now, you can visit the address, and you will see more configuration stuffs
10. select on `Use virtualhost naming for apps` and click on `Finish Setup`
11. now you can `ssh root@{ipv4 address}` to visit your vps which would be a dokku container
12. after you connect to the vps, you can start setup your environment with the dokku documentation
13. run `dokku apps:create api` to create the application with name `api`
14. run `sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git` to install postgres service
15. run `dokku postgres:create hummus` to create a database with name `hummus`
16. run `dokku postgres:link hummus api` to connect the database to the application
17. run `sudo dokku plugin:install https://github.com/dokku/dokku-redis.git redis`
18. run `dokku redis:create olive` to create a redis service with name `olive`
19. run `dokku redis:link olive api` to connect redis service to the application
20. now you can see the docker container of postgres and redis by running `docker container list`
21. the next step is going to write a dockerfile for our application

### service provider comparison

1. vercel, netlify are both for front-end deploy
2. https://ritza.co/comparisons/heroku-vs-aws-vs-digitalocean-vs-netlify-vs-firebase-vs-docker.html
3. https://codewithhugo.com/deployment-options-netlify-dokku-on-digitalocean-vs-now.sh-github-pages-heroku-and-aws/

### docker-compose vs dokku

Docker Compose vs Dokku: What are the differences?

Developers describe Docker Compose as "Define and run multi-container applications with Docker". With Compose, you define a multi-container application in a single file, then spin your application up in a single command which does everything that needs to be done to get it running. On the other hand, Dokku is detailed as "Docker powered mini-Heroku in around 100 lines of Bash". Docker powered mini-Heroku. The smallest PaaS implementation you've ever seen.

Docker Compose belongs to "Container Tools" category of the tech stack, while Dokku can be primarily classified under "Platform as a Service".

"Multi-container descriptor" is the primary reason why developers consider Docker Compose over the competitors, whereas "Simple" was stated as the key factor in picking Dokku.

Docker Compose and Dokku are both open source tools. Dokku with 17.8K GitHub stars and 1.45K forks on GitHub appears to be more popular than Docker Compose with 16.9K GitHub stars and 2.61K GitHub forks.

According to the StackShare community, Docker Compose has a broader approval, being mentioned in 1082 company stacks & 3350 developers stacks; compared to Dokku, which is listed in 31 company stacks and 59 developer stacks.

see more [link](https://stackshare.io/stackups/docker-compose-vs-dokku)

## Docker

in this section, we reference to the [docs](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) to build our `Dockerfile` and `.dockerignore`

then you can run the following command to test if it can be build

```shell
# chu: user name
# lireddit: project name
# test: tag name (like a version)
# we need arch amd64 to run on server
docker build --platform linux/amd64 -t chu025/lireddit:1 .
```

### dotenv-safe

also you need to setup your environment variable.

in this project, we are using `dotenv-safe`

and remember that, you'd better put .env into your `.gitignore` file. however, it is just a practice for me, i will still upload the .env to github

after you finish your .env file, you can run the command below to generate

- `.env.example` to demostrate what should include in this example
- `src/env.d.ts` to give the type for our environment variables

```
npx gen-env-types .env -o src/env.d.ts -e .
```

`dotenv-safe` will remind you if you didn't fill up every `.env.example` variables

in the production mode, dokku will fill up some environment variable for us.

## DB Migrations

first, we cannot use `synchronize: true` in production mode, or it will create new table for every launch. to disable synchronize, we need to create our own table creatioin migration. to do this, we need to create `ormconfig.json`

```json
// in ormconfig.json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "lireddit3",
  "entities": ["src/entities/*.ts"],
  "migrations": ["src/migrations/*.ts"]
}
```

secondly, we can append new script into package.json

```json
// in package.json
"typeorm": "ts-node ./node_modules/typeorm/cli.js"
```

then, we can run the command below to generate table creation migration

```
npm run typeorm migration:generate -- -n Inititial
```

finally, we can put the generated migration into the migration folder

### more

we need to setup proxy to make sure session works well by using code below

```
app.set("proxy", 1);
```

## docker hub

after you finish the setup, you can create an respository in docker hub, and use the following command to upload the docker image to docker hub

refer to [site](https://dokku.com/docs~v0.21.4/deployment/methods/images/#deploying-from-a-docker-registry)

```shell
docker login
# docker push ${user_name}/${project_name}:${tag}
docker push chu025/lireddit:1
```

after the image is uploaded, you can pull the image in the vps

```shell
docker pull chu025/lireddit:1
docker tag chu025/lireddit:1 dokku/api:latest
dokku tags:deploy api latest
```

now you have been successfully deployed your api server. however, the port might not be visible. you can use `dokku proxy:ports api` to check which port is forwarding to the container.

```shell
# for example you might see
root@lireddit:~# dokku proxy:ports api
-----> Port mappings for api
    -----> scheme  host port  container port
    http           8080       8080
```

then you can use `dokku proxy:ports-add api http:80:8080` to add new port forwarding setting.

### https

unfortunately, i havent figure how to enable https (`letsencrypt` might be helpful)

### notes

since I cannot find any appropriate image for ` "argon2": "^0.28.2"`, hence, I downgrade it to ` "argon2": "^0.26.2",`

## Deploy Frontend
### package
- vercel: Vercel, built by the same team that made Next.js, provides production-grade hosting for Next.js websites with zero configuration.

to install it, run
```
npm i -g vercel@latest
```

### notes
Next.js has built-in support for loading environment variables from `.env.local` into `process.env.`

In order to expose a variable to the browser you have to prefix the variable with `NEXT_PUBLIC_`. For example:

```
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

see more [link](https://nextjs.org/docs/basic-features/environment-variables)

### script
before deploy run `npm run build` to make sure it can be successfully compiled.

then, you can simply run `vercel`, fill up the infomation, and you will get the preview of your nextjs project.

run `vercel --prod` to make your nextjs project be production

now, you can visit the vercel website: https://vercel.com

and go -> `Settings` -> `Environment Variables` and setup

on the other hand, you have to modify the cors variable of your backend.

### more works

however, i encounter a problem. when frontend try to fetch data from backend, it gives the errors
```
[Warning] [blocked] The page at https://lireddit-steel.vercel.app/ was not allowed to display insecure content from http://147.182.217.19/graphql. (218-0ef53cb8f91a9b7bb6cf.js, line 1)

[Error] Not allowed to request resource
	(anonymous function) (218-0ef53cb8f91a9b7bb6cf.js:1:18612)
	promiseReactionJob
[Error] Fetch API cannot load http://147.182.217.19/graphql due to access control checks.
	(anonymous function) (218-0ef53cb8f91a9b7bb6cf.js:1:18612)
	promiseReactionJob
```

### notes

https required a domain name. hence, it'd better to purchase a domain name to enable https

## Typeorm Caching
In this [video](https://www.youtube.com/watch?v=1ieedETExwc), ben demostrate how to cache the data fetched by typeorm.