import React, {useState, useRef, useCallback} from "react";

type Props = {
  n: number,
  increment: (n: number) => void,
}

const useCountRender = (): void => {
  const render = useRef(0);
  console.log(`render: ${render.current++}`);
};

const Square = ({n, increment}: Props): JSX.Element => {
  useCountRender();
  return (
    <button onClick={()=>increment(n)}>{n}</button>
  );
};

const SquareMemo = React.memo(Square);

const Example2 = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const favoriteNums = [7, 21, 37];
  const increment = useCallback((n: number)=>{
    setCount(c => c+n);
  }, [setCount]);

  return (
    <div>
      {favoriteNums.map(n=>{
        return <SquareMemo key={n} n={n} increment={increment}/>;
      })}
      <div>count: {count}</div>
    </div>
  );
};

export default Example2;