import React, { useEffect, useState, useRef, useLayoutEffect } from "react";

type State = {
  data: null | string;
  loading: boolean;
};

const useFetch = (url: string): State => {
  const isCurrent = useRef(true);
  const [state, setState] = useState<State>({ data: null, loading: true });

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: state.data, loading: true });
    fetch(url)
      .then((x) => x.text())
      .then((x) => {
        if (isCurrent.current) {
          setState({ data: x, loading: false });
        }
      });
  }, [url]);

  return state;
};

type UseMeasureType<T extends HTMLElement> = [React.RefObject<T>, DOMRect | null | undefined];

// in tsx you cannot just write <T>
// you have to write <T, >
const useMeasure = <T extends HTMLElement>(
  deps: React.DependencyList | undefined
): UseMeasureType<T> => {
  const [rect, setRect] = useState<DOMRect | null | undefined>(null);
  const myRef = useRef<T>(null);

  useLayoutEffect(() => {
    if(myRef.current){
      setRect(myRef.current.getBoundingClientRect());
    }
  }, deps);

  return [myRef, rect];
};

export const Example2 = (): JSX.Element => {
  const [count, setCount] = useState<number>(() =>
    JSON.parse(localStorage.getItem("count") || "0")
  );
  const url = `http://numbersapi.com/${count}/trivia`;
  const { data, loading } = useFetch(url);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  const [divRef, rect] = useMeasure<HTMLDivElement>([data]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div ref={divRef}>{loading ? "loading..." : data}</div>
      </div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <pre>{JSON.stringify(rect, null, 2)}</pre>
    </div>
  );
};
