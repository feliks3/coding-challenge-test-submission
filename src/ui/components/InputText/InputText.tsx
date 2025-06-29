import React, { FunctionComponent } from "react";

import $ from "./InputText.module.css";

interface InputTextProps {
  name: string;
  placeholder: string;
  extraProps: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputText: FunctionComponent<InputTextProps> = ({
  name,
  placeholder,
  extraProps,
}) => {
  return (
    <input
      aria-label={name}
      className={$.inputText}
      name={name}
      onChange={extraProps.onChange}
      placeholder={placeholder}
      type="text"
      value={extraProps.value}
      {...extraProps}
    />
  );
};

export default InputText;
