import "reflect-metadata";
import "dotenv-safe/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/message";
import cors from "cors";
import ws from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import session from "express-session";
import { COOKIE_NAME, PROD } from "./config";
import { RoomResolver } from "./resolvers/room";
import { UserResolver } from "./resolvers/user";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { execute, subscribe } from "graphql";

const main = async () => {
  const app = express();

  // in production mode, we need to setup proxy to make sure session works
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const sessionMiddleware = session({
    name: COOKIE_NAME,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: "lax", // csrf
      secure: PROD, // cookie only works in https
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
  });

  app.use(sessionMiddleware);

  const schema = await buildSchema({
    resolvers: [HelloResolver, MessageResolver, RoomResolver, UserResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({
      req,
      res,
    }),
    plugins: PROD ? [] : [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const server = app.listen(parseInt(process.env.PORT as string), () => {
    // create and use the websocket server
    const wsServer = new ws.Server({
      server,
      path: "/graphql",
    });

    useServer(
      {
        context: (ctx) => {
          return new Promise((resolve, _reject) => {
            const req = ctx.extra.request as express.Request;
            const res = {} as any as express.Response;

            sessionMiddleware(req, res, (_: any) => {
              resolve({ req });
            });
          });
        },
        schema,
        execute,
        subscribe,
      },
      wsServer
    );
    console.log(`server started on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
