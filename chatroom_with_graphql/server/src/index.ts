import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/message";
import cors from "cors";
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const main = async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver, MessageResolver],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema: schema,
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const server = app.listen(8000, () => {
    // create and use the websocket server
    const wsServer = new ws.Server({
      server,
      path: '/graphql',
    });
  
    useServer({ schema }, wsServer);
    console.log("server started on localhost:8000");
  });
};

main().catch((err) => {
  console.error(err);
});
