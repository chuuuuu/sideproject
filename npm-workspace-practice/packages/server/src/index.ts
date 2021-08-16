import express from "express";
import cors from "cors";
import { hello } from "@nwp/common";

const main = async () => {
  const app = express();

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:19002"],
      credentials: true,
    })
  );

  app.get("/hello", (_req, res) => {
    res.send("hello from server");
  });

  app.listen(4000, () => {
    hello();
    console.log("listening on port 4000");
  });
};

main();
