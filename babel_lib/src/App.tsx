import * as React from "react";

interface Props{
  bar: string,
  foo: string,
}

class App extends React.Component<Props>{
  constructor(props: Props){
    super(props);
  }

  render(): JSX.Element {
    return (
      <div> hello world </div>
    );  
  }
}

export default App;
