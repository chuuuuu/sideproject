import React, {useEffect} from "react";

// example1 is without DependencyList, hence the unmounting function will be called for every render.
const Example1 = (): JSX.Element=>{
  // pass the mounting function
  useEffect(() => {
    console.log("mounting Example1...");
    // return the unmounting function
    return () => {
      console.log("unmounting Example1...");
    };
  });

  return (
    <div>look at the console</div>
  );
};

export default Example1;
