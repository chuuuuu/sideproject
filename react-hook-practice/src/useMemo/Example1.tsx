import React, {useState, useEffect, useMemo} from "react";

type State<T> = {
  data: null | T,
  loading: boolean,
};

const useFetch = <T,>(url: string): State<T> => {
  const [state, setState] = useState<State<T>>({data: null, loading: true});

  // you cannot use async directly here, since async function would return Promise which is the type accepted by useEffect
  // be careful that you should not put state into dependency list or you might have an infinite loop
  useEffect(() => {
    setState({data: state.data, loading: true});
    fetch(url)
      .then(x => x.json())
      .then(x => {
        setState({data: x, loading: false});
      });
  }, [url]);

  return state;
};

type Data = string[] | null;

const computeLongesetWord = (data: Data)=>{
  console.log(`computing longest word, data.length: ${data?.length}`);
  if(!data){
    return "";
  }

  let longestWord = "";
  data.forEach(sentence => sentence.split(" ").forEach(word => {
    if (word.length > longestWord.length){
      longestWord = word;
    }
  }));

  return longestWord;
};

// you can use useMemo only when you feeling slowly
export const Example1: React.FC = () => {
  const [count, setCount] = useState(0);

  const url = "https://raw.githubusercontent.com/ajzbc/kanye.rest/master/quotes.json";
  const {data} = useFetch<Data>(url);

  const longestWord = useMemo(()=>computeLongesetWord(data), [data, computeLongesetWord]);

  return(
    <div>
      {longestWord}
      <br/>
      <button onClick={()=>setCount(count+1)}>{count}</button>
    </div>
  );
};
