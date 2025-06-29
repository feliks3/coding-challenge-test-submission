import React, { FunctionComponent, useState } from "react";

type FormValues = Record<string, string>;

const useFormFields = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetFields = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetFields,
  };
};

export default useFormFields;
