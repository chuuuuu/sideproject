import React, {useState} from "react";

const Example2 = (): JSX.Element=>{
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <input name="email" value={email} onChange={e=>{setEmail(e.target.value);}} placeholder="email"/>
      <input name="password" type="password" value={password} onChange={e=>{setPassword(e.target.value);}} placeholder="password"/>
    </div>
  );
};

export default Example2;
