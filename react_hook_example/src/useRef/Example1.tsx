import React, { useRef } from "react";

export const Example1: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input ref={inputRef}></input>
      <button
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        focus
      </button>
    </div>
  );
};
