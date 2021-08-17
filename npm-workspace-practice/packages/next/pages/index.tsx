import { hello as helloContoller } from "@nwp/controller";
import { hello as helloCommon } from "@nwp/common";

const Index = () => {
  helloContoller();
  helloCommon();

  return <div>hello from next.js</div>
};

export default Index;
