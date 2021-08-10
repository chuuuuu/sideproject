import React from "react";

type AppProp = {
  foo: string,
  bar: string,
};

const App = ({foo, bar}: AppProp): JSX.Element => {
  return (
    <div>
      <div> hello {foo} </div>
      <div> hello {bar} </div>
    </div>
  );
};

export default App;
