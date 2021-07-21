import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/message";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import cors from "cors";

const main = async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const httpServer = createServer(app);
  const schema = await buildSchema({
    resolvers: [HelloResolver, MessageResolver],
    validate: false,
  });
  const apolloServer = new ApolloServer({
    schema: schema,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  apolloServer.installSubscriptionHandlers

  SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
    },
    {
      // This is the `httpServer` we created in a previous step.
      server: httpServer,
      // This `server` is the instance returned from `new ApolloServer`.
      path: apolloServer.graphqlPath,
    }
  );

  httpServer.listen(8000, () => {
    console.log("server started on localhost:8000");
  });
};

main().catch((err) => {
  console.error(err);
});
