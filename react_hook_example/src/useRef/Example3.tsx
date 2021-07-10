import React, {useEffect, useState, useRef} from "react";

type State = {
  data: null | string,
  loading: boolean,
};

// if you delete the component before setState, it will give you a warn
// "Can't perform a React state update on an unmounted component."
const useFetch = (url: string): State => {
  const isCurrent = useRef(true);
  const [state, setState] = useState<State>({data: null, loading: true});

  useEffect(()=>{
    return ()=>{
      // called when the component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState({data: state.data, loading: true});
    fetch(url)
      .then(x => x.text())
      .then(x => {
        setTimeout(()=>{
          if(isCurrent.current){
            setState({data: x, loading: false});
          }
          else{
            console.log("example3 sucess");
          }
        }, 2000);
      });
  }, [url]);

  return state;
};

const Example3 = (): JSX.Element => {
  const [count, setCount] = useState<number>(()=>JSON.parse(localStorage.getItem("count") || "0"));
  const url = `http://numbersapi.com/${count}/trivia`;
  const {data, loading} = useFetch(url);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  return (
    <div>
      <div>{loading? "loading..." : data}</div>
      <button onClick={() => setCount(count+1)}>+</button >
    </div>
  );
};

export default Example3;