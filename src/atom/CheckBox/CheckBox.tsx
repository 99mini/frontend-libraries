import React from "react";
import classNames from "classnames";
import "./CheckBox.scss";

import Ripple from "@core/Ripple";

export type CheckBoxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & CheckBoxPropsType;

type CheckBoxPropsType = {
  label?: string;
  labelPlacement?: "top" | "bottom" | "left" | "right";
};

const CheckBoxRoot = ({ ...props }: Omit<CheckBoxProps, keyof CheckBoxPropsType>) => {
  return (
    <span className={classNames("Mini-CheckBox-root", props.className)} aria-disabled={props.disabled} aria-required={props.required}>
      <input {...props} className={classNames("Mini-CheckBox")} type="checkbox" />
      {/* <Ripple /> */}
    </span>
  );
};

const CheckBox = ({ ...props }: CheckBoxProps) => {
  const { label, labelPlacement = "right", ...inputProps } = props;

  if (label) {
    return (
      <label className={classNames("Mini-Label-root", `Mini-Label-layout--${labelPlacement}`)} aria-disabled={inputProps.disabled} aria-required={inputProps.required}>
        <CheckBoxRoot {...inputProps} />
        <span className={classNames("Mini-Label-text")}> {label}</span>
      </label>
    );
  }

  return <CheckBoxRoot {...inputProps} />;
};

export default CheckBox;
