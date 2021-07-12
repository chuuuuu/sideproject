import { MikroORM } from "@mikro-orm/core";
// import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  // database initialization
  const orm = await MikroORM.init(mikroConfig);
  const migrator = orm.getMigrator();
  await migrator.createMigration();
  await migrator.up();

  // server initialize
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });

  // // it only create an instance, nothing related to database
  // const post = orm.em.create(Post, { title: "my first post" });

  // // you can find the usage of function from official docs
  // // https://mikro-orm.io/docs/repositories-api/#persistandflushentity-anyentity--anyentity-promisevoid
  // await orm.em.persistAndFlush(post);

  // // select all posts in the post table
  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
};

main().catch((err) => {
  console.error(err);
});
