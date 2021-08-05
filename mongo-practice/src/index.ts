import "reflect-metadata";
import { createConnection } from "typeorm";
import { Todo } from "./entities/Todo";
// import { getMongoRepository } from "typeorm";

const main = async () => {
  const con = await createConnection({
    type: "mongodb",
    host: "localhost",
    database: "test",
    logging: true,
    entities: [Todo],
    synchronize: true,
    useUnifiedTopology: true,
  });

  const todos = await con.mongoManager.find(Todo);
  console.log(todos);
  console.log("success");
};

main().catch((err) => {
  console.log(err);
});
