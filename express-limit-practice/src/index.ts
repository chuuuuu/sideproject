import express from "express";
import rateLimit from "express-rate-limit";

const main = async () => {
  const app = express();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 10,
    // https://www.npmjs.com/package/rate-limit-redis
    // store: new RateLimitRedisStore({ client: redis }),
  });
  app.use(limiter);

  app.get("/", (_req, res) => {
    res.send("hello world");
  });

  app.listen(4000, () => {
    console.log("listen on port 4000");
  });
};

main().catch((e) => console.log(e));
