import { Client } from "@elastic/elasticsearch";

const main = async () => {
  const client = new Client({ node: "http://localhost:9200" });

  await client.index({
    index: "game-of-thrones",
    id: "1",
    body: {
      character: "Ned Stark",
      quote: "Winter is coming.",
    },
  });

  const { body } = await client.get({
    index: "game-of-thrones",
    id: "1",
  });

  console.log(body);
};

main().catch((err) => {
  console.log(err);
});
