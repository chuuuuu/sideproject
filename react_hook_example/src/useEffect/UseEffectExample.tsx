import React, { useState } from "react";
import { Example1 } from "./Example1";
import { Example2 } from "./Example2";
import { Example3 } from "./Example3";
import { Example4 } from "./Example4";

// react will record the DependencyList of the useEffect when creating the element for the first time.
// after that, react will compare the DependencyList with the older one when the functional component is called (updated) again
// if DependencyList is changed, react will run the unmounting function and the mounting function

// for example, when we click the example2 button
// it will call setShowExample2 which will make the UseEffectExample component re-render
// when UseEffectExample is called again, Example1 is called
// also example1 is without DependencyList
// that's why example1's unmounting & mounting function will be called for every re-render

export const UseEffectExample: React.FC = () => {
  const [showExample1, setShowExample1] = useState<boolean>(false);
  const [showExample2, setShowExample2] = useState<boolean>(false);
  const [showExample3, setShowExample3] = useState<boolean>(false);
  const [showExample4, setShowExample4] = useState<boolean>(false);

  return (
    <div>
      {/* example1 */}
      <button
        onClick={() => {
          setShowExample1(!showExample1);
        }}
      >
        show example 1
      </button>
      {showExample1 && <Example1 />}
      <br />

      {/* example2 */}
      <button
        onClick={() => {
          setShowExample2(!showExample2);
        }}
      >
        show example 2
      </button>
      {showExample2 && <Example2 />}
      <br />

      {/* example3 */}
      <button
        onClick={() => {
          setShowExample3(!showExample3);
        }}
      >
        show example 3
      </button>
      {showExample3 && <Example3 />}
      <br />

      {/* example4 */}
      <button
        onClick={() => {
          setShowExample4(!showExample4);
        }}
      >
        show example 4
      </button>
      {showExample4 && <Example4 />}
      <br />
    </div>
  );
};
