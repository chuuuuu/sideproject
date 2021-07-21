import { useState } from "react";

type UseFormReturn<T> = [T, (e: React.ChangeEvent<HTMLInputElement>) => void];

export const useForm = <T,>(initialValues: T): UseFormReturn<T> => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
};
