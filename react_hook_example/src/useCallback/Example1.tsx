import React, {useRef, useState, useCallback} from "react";

const useCountRender = (): void => {
  const render = useRef(0);
  console.log(`render: ${render.current++}`);
};

type Prop = {
  increment: ()=>void,
};

const Hello = ({increment}: Prop): JSX.Element=>{
  useCountRender();
  return(
    <button onClick={increment}>Hello</button>
  );
};

// render only when props change
const HelloMemo = React.memo(Hello);

// in this example, we demo that increment will change only when the deps change which is [setCount] in this case
// hence, HelloMemo will receive the same props if setCount does not change
// this can make react no need to render HelloMemo anymore.
const Example1 = (): JSX.Element=>{
  const [count, setCount] = useState(0);

  // increment will change only when setCount change
  const increment = useCallback(() => {
    // use a second form of setState() that accepts a function rather than an object.
    // the function will receive the previous state as the first argument
    // and the props at the time the update is applied as the second argument
    setCount(c => c+1);
  }, [setCount]);

  return (
    <div>
      <HelloMemo increment={increment}/>
      <div>count: {count}</div>
    </div>
  );
};

export default Example1;
