import React, {useEffect, useState} from "react";

type State = {
  data: null | string,
  loading: boolean,
};

// custom hook
const useFetch = (url: string): State => {
  const [state, setState] = useState<State>({data: null, loading: true});

  // you cannot use async directly here, since async function would return Promise which is the type accepted by useEffect
  // be careful that you should not put state into dependency list or you might have an infinite loop
  useEffect(() => {
    setState({data: state.data, loading: true});
    fetch(url)
      .then(x => x.text())
      .then(x => {
        setState({data: x, loading: false});
      });
  }, [url]);

  return state;
};

const Example4 = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const url = `http://numbersapi.com/${count}/trivia`;
  const {data, loading} = useFetch(url);

  return (
    <div>
      <div>{loading? "loading..." : data}</div>
      <button onClick={() => setCount(count+1)}>+</button >
    </div>
  );
};

export default Example4;