import React, {useState} from "react";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";

const UseStateExample = (): JSX.Element => {
  const [showExample1, setShowExample1] = useState<boolean>(false);
  const [showExample2, setShowExample2] = useState<boolean>(false);
  const [showExample3, setShowExample3] = useState<boolean>(false);


  return (
    <div>
      {/* example1 */}
      <button onClick={()=>{setShowExample1(!showExample1);}}>show example 1</button>
      {showExample1 && <Example1/>}
      <br/>

      {/* example2 */}
      <button onClick={()=>{setShowExample2(!showExample2);}}>show example 2</button>
      {showExample2 && <Example2/>}
      <br/>

      {/* example3 */}
      <button onClick={()=>{setShowExample3(!showExample3);}}>show example 3</button>
      {showExample3 && <Example3/>}
      <br/>

    </div>
  );
};

export default UseStateExample;
