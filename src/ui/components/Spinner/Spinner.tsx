import React, { FunctionComponent } from "react";

import $ from "./Spinner.module.css";

const Spinner: FunctionComponent = () => {
  return <div className={$.loader} data-testid="loading-spinner"></div>;
};

export default Spinner;
