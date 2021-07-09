import React, {useState} from "react";

type Value = {
  [key: string]: string,
};

type UseFormReturn = [
  Value,
  (e: React.ChangeEvent<HTMLInputElement>)=>void
]

const useForm = (initialValues: Value): UseFormReturn => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  ];
};

const Example3 = (): JSX.Element=>{
  const [values1, handleChange1] = useForm({email: "", password: ""});
  const [values2, handleChange2] = useForm({firstname: "", lastname: ""});

  return (
    <div>
      <input name="email" value={values1.email} onChange={handleChange1} placeholder="email"/>
      <input name="password" type="password" value={values1.password} onChange={handleChange1} placeholder="password"/>
      <input name="firstname" value={values2.firstname} onChange={handleChange2} placeholder="firstname"/>
      <input name="lastname" value={values2.lastname} onChange={handleChange2} placeholder="lastname"/>
    </div>
  );
};

export default Example3;
