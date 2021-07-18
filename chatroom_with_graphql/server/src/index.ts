import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/message";

const main = async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, MessageResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(8000, () => {
    console.log("server started on localhost:8000");
  });
};

main().catch((err) => {
  console.error(err);
});
