import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { ArticleResolver } from "./resolvers/article";

const main = async () => {
  // express setup
  const app = express();

  // cors
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  // apolloServer setup
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, ArticleResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // listen on port 3344
  app.listen(3344, () => {
    console.log("server started on localhost:3344");
  });
};

main().catch((err) => {
  console.error(err);
});
