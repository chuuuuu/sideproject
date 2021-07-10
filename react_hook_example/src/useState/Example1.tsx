import React, {useState} from "react";

// react will compare if the state is changed. if state does not change, it won't render
const Example1 = (): JSX.Element=>{
  const [count1, setCount1] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  console.log("render!");

  return (
    <div>
      <button onClick={()=>setCount1(count1)}>{count1}</button>
      <button onClick={()=>setCount2(count2+1)}>{count2}</button>
    </div>
  );
};

export default Example1;
