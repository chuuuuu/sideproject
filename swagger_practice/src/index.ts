import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { getBooksRouter } from "./routes/books";
import bodyParser from "body-parser";

const main = async () => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
      },
      servers: [
        {
          url: "http://localhost:5555",
        },
      ],
    },
    apis: ["./src/routes/*.ts"],
  };

  const specs = swaggerJsDoc(options);

  const app = express();

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  app.use(cors());
  // https://stackoverflow.com/questions/24543847/req-body-empty-on-posts
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/books", await getBooksRouter());

  const PORT = 5555;
  app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
};

main().catch((err) => {
  console.log(err);
});
