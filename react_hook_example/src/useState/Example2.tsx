import React, {useState} from "react";

const Example2 = (): JSX.Element=>{
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <input name="email" value={email} onChange={e=>{setEmail(e.target.value);}}/>
      <input name="password" type="password" value={password} onChange={e=>{setPassword(e.target.value);}}/>
    </div>
  );
};

export default Example2;
