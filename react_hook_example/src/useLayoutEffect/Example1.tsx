import React, {useRef, useEffect, useLayoutEffect} from "react";

// react will compare if the state is changed. if state does not change, it won't render
const Example1 = (): JSX.Element=>{
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    console.log(inputRef.current?.getBoundingClientRect());
  }, []);

  useLayoutEffect(()=>{
    console.log(inputRef.current?.getBoundingClientRect());
  }, []);

  return (
    <div>
      <input ref={inputRef}></input>
    </div>
  );
};

export default Example1;
