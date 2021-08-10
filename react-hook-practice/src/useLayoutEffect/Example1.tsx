import React, { useRef, useEffect, useLayoutEffect } from "react";

// react will compare if the state is changed. if state does not change, it won't render
export const Example1: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(inputRef.current?.getBoundingClientRect());
  }, []);

  useLayoutEffect(() => {
    console.log(inputRef.current?.getBoundingClientRect());
  }, []);

  return (
    <div>
      <input ref={inputRef}></input>
    </div>
  );
};
