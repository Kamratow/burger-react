import React from "react";

import classes from "./Button.css";

// I'd use different prop name for 'clicked'
const Button = ({ disabled, btnType, clicked, children }) => (
  <button
    disabled={disabled}
    className={[classes.Button, classes[btnType]].join(" ")}
    onClick={clicked}
  >
    {children}
  </button>
);

export default Button;
