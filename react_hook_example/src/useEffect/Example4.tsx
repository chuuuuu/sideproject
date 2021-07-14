import React, { useEffect, useState } from "react";

type State = {
  data: null | string;
  loading: boolean;
};

// custom hook
const useFetch = (url: string): State => {
  const [state, setState] = useState<State>({ data: null, loading: true });

  // you cannot use async directly here, since async function would return Promise which is the type accepted by useEffect
  // be careful that you should not put state into dependency list or you might have an infinite loop
  useEffect(() => {
    setState({ data: state.data, loading: true });
    fetch(url)
      .then((x) => x.text())
      .then((x) => {
        setState({ data: x, loading: false });
      });
  }, [url]);

  return state;
};

export const Example4: React.FC = () => {
  const [count, setCount] = useState<number>(() =>
    JSON.parse(localStorage.getItem("count") || "0")
  );
  const url = `http://numbersapi.com/${count}/trivia`;
  const { data, loading } = useFetch(url);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  return (
    <div>
      <div>{loading ? "loading..." : data}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
