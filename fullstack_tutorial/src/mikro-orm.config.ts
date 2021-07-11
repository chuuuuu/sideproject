import { PROD } from "./config";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  // https://mikro-orm.io/docs/migrations/#configuration
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[jt]s$/,
  },
  entities: [Post],
  dbName: "lireddit",
  type: "postgresql",
  debug: !PROD,
} as Parameters<typeof MikroORM.init>[0];
