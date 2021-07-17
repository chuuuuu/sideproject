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

Then, we can use send the error message in the `[FieldError]` of  `UserResponse` if there's invalid manipulation.

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