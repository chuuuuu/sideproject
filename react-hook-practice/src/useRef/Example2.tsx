import React, { useState, useRef } from "react";

// if you are using <React.StrictMode>, you'll encounter unexpected result. (render.current will incremented by 2!)
export const Example2: React.FC = () => {
  const [state, setState] = useState(0);
  const render = useRef(0);

  console.log(`hello render: ${render.current}`);
  render.current += 1;

  return (
    <div>
      <button
        onClick={() => {
          setState(state + 1);
        }}
      >
        Click me to render
      </button>
    </div>
  );
};
