import express from "express";

const main = async () => {
  const app = express();

  app.get("/", (_req, res) => {
    res.send("hello world")
  });

  app.listen(3000, () => {
    console.log("server started on localhost:3000");
  });
};

main().catch((e) => console.log(e));
