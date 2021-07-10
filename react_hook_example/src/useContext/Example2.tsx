import React, {useReducer, useState} from "react";

enum ACTION {
  ADD_TODO = 1,
  TOGGLE_TODO = 2,
}

type Config = {
  type: ACTION.ADD_TODO,
  text: string,
} | {
  type: ACTION.TOGGLE_TODO,
  idx: number,
};

type Todo = {
  text: string,
  complete: boolean,
}

type State = {
  todos: Todo[],
  todoCount: number,
};

const reducer = (state: State, config: Config) => {
  switch(config.type){
  case ACTION.ADD_TODO:
    return {
      todos: [...state.todos, {text: config.text, complete: false}],
      todoCount: state.todoCount+1,
    };

  case ACTION.TOGGLE_TODO:
    return {
      todos: state.todos.map((t, idx) => idx === config.idx ? {...t, complete: !t.complete}: t),
      todoCount: state.todoCount,
    };

  default:
    return state;
  }
};

// the problem here is, when to use useState? and when to use useReduer?
// short answer is:
// when your state growing to complex, use useReducer

// when your state is growing to extremely huge, you might consider other packages such as useImmer
// https://github.com/immerjs/use-immer
const Example2 = (): JSX.Element => {
  const [{todos, todoCount}, dispatch] = useReducer(reducer, {todos: [], todoCount: 0});
  const [text, setText] = useState<string>("");

  return(
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        dispatch({type: ACTION.ADD_TODO, text: text});
        setText("");
      }}>
        <input value={text} onChange={e => setText(e.target.value)}/>
      </form>
      <div>todoCount: {todoCount}</div>
      {todos.map((t, idx) => (
        <div key={t.text} onClick={() => dispatch({type: ACTION.TOGGLE_TODO, idx: idx})}>{t.text}: {t.complete? "good": "bad"}</div>
      ))}
      {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
    </div>
  );
};

export default Example2;