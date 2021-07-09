import React, {useState, useEffect} from "react";

const Example2 = (): JSX.Element=>{
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    console.log("mounting email...");
    return () => {
      console.log("unmounting email...");
    };
  }, [email]);

  useEffect(() => {
    console.log("mounting password...");
    return () => {
      console.log("unmounting password...");
    };
  }, [password]);

  return (
    <div>
      <input name="email" value={email} onChange={e=>{setEmail(e.target.value);}}/>
      <input name="password" type="password" value={password} onChange={e=>{setPassword(e.target.value);}}/>
    </div>
  );
};

export default Example2;
