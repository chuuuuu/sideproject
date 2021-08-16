import React from "react";
import { hello as helloContoller } from "@nwp/controller";
import { hello as helloCommon } from "@nwp/common";

function App() {
  helloContoller();
  helloCommon();
  return (
    <div>
      <div>hello world from React</div>
    </div>
  );
}

export default App;
