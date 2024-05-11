import React, { useRef } from "react";
import classNames from "classnames";
import "./CheckBox.scss";

import { Ripple } from "@99mini/core";

export type CheckBoxProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  CheckBoxPropsType;

type CheckBoxPropsType = {
  label?: string;
  labelPlacement?: "top" | "bottom" | "left" | "right";
};

const CheckBoxRoot = ({
  ...props
}: Omit<CheckBoxProps, keyof CheckBoxPropsType>) => {
  const { className, disabled, required, ...inputProps } = { ...props };
  const checkboxRef = useRef<HTMLElement>(null);

  return (
    <label>
      <span
        className={classNames("Mini-CheckBox-root", className)}
        aria-disabled={disabled}
        aria-required={required}
        ref={checkboxRef}
      >
        <input
          {...inputProps}
          disabled={disabled}
          required={required}
          className={classNames("Mini-CheckBox")}
          type="checkbox"
        />
        <Ripple parentRef={checkboxRef} isTouch />
      </span>
    </label>
  );
};

export const CheckBox = ({ ...props }: CheckBoxProps) => {
  const { label, labelPlacement = "right", ...inputProps } = props;

  if (label) {
    return (
      <label
        className={classNames(
          "Mini-Label-root",
          `Mini-Label-layout--${labelPlacement}`,
        )}
        aria-disabled={inputProps.disabled}
        aria-required={inputProps.required}
      >
        <CheckBoxRoot {...inputProps} />
        <span className={classNames("Mini-Label-text")}>{label}</span>
      </label>
    );
  }

  return <CheckBoxRoot {...inputProps} />;
};

export default CheckBox;
