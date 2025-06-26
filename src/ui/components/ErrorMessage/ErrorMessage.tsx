import React, { FunctionComponent } from "react";

import $ from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

const Button: FunctionComponent<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return <div>{message}</div>;
};

export default Button;
