import React from "react";
import classNames from "classnames";
import "./CheckBox.scss";

export type CheckBoxProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const CheckBox = ({ ...props }: CheckBoxProps) => {
  return (
    <input
      {...props}
      className={classNames("Mini-CheckBox", props.className)}
      type="checkbox"
    />
  );
};

export default CheckBox;
