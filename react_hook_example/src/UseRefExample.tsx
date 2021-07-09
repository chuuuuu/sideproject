import React, {useState, useRef} from "react";

const UseRefExample = (): JSX.Element=>{
  const [count, setCount] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef}>
      <button onClick={()=>setCount(count+1)}>{count}</button>
      <input ref={inputRef}></input>
    </div>
  );
};

export default UseRefExample;
