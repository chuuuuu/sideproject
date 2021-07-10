import React, {useState} from "react";
import Example1 from "./Example1";

const UseContextExample = (): JSX.Element => {
  const [showExample1, setShowExample1] = useState<boolean>(false);


  return (
    <div>
      {/* example1 */}
      <button onClick={()=>{setShowExample1(!showExample1);}}>show example 1</button>
      {showExample1 && <Example1/>}
      <br/>

    </div>
  );
};

export default UseContextExample;
