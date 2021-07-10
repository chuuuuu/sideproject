import React, {useRef} from "react";

const Example1 = (): JSX.Element=>{
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={inputRef}></input>
      <button onClick={()=>{
        inputRef.current?.focus();
      }}>focus</button>
    </div>
  );
};

export default Example1;
