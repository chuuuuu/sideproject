import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  const migrator = orm.getMigrator()
  await migrator.createMigration();
  await migrator.up();

  // it only create an instance, nothing related to database
  const post = orm.em.create(Post, { title: "my first post" });

  // you can find the usage of function from official docs
  // https://mikro-orm.io/docs/repositories-api/#persistandflushentity-anyentity--anyentity-promisevoid
  await orm.em.persistAndFlush(post);

  // select all posts in the post table
  const posts = await orm.em.find(Post, {});
  console.log(posts);
};

main().catch((err) => {
  console.error(err);
});
