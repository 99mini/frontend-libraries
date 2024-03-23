import React from "react";
import "./CheckBox.scss";

export type CheckBoxProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const CheckBox = () => {
  return <input type="checkbox" />;
};

export default CheckBox;
