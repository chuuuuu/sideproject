import { BabelManager } from "./babel/babelManager";

const main = async () => {
  const address = BabelManager.getAddress("我叫林展慶1");
  console.log(address);

  const content = BabelManager.getContent(address);
  console.log(content);
};

main();
