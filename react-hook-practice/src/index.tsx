import React from "react";
import ReactDOM from "react-dom";
import { UseStateExample } from "./useState/UseStateExample";
import { UseEffectExample } from "./useEffect/UseEffectExample";
import { UseRefExample } from "./useRef/UseRefExample";
import { UseLayoutEffectExample } from "./useLayoutEffect/UseLayoutEffectExample";
import { UseCallbackExample } from "./useCallback/UseCallbackExample";
import { UseMemoExample } from "./useMemo/UseMemoExample";
import { UseReducerExample } from "./useReducer/UseReducerExample";
import { UseContextExample } from "./useContext/UseContextExample";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <div>
    <h1>useState</h1>
    <UseStateExample />

    <h1>useEffect</h1>
    <UseEffectExample />

    <h1>useRef</h1>
    <UseRefExample />

    <h1>useLayoutEffect</h1>
    <UseLayoutEffectExample />

    <h1>useCallback</h1>
    <UseCallbackExample />

    <h1>useMemo</h1>
    <UseMemoExample />

    <h1>useReducer</h1>
    <UseReducerExample />

    <h1>useContext</h1>
    <UseContextExample />
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
