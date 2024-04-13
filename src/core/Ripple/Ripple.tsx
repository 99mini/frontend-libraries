import React from "react";
import classNames from "classnames";
import "./Ripple.scss";

export type CheckBoxProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & {};

const Ripple = ({ ...props }: CheckBoxProps) => {
  return (
    <span {...props} className={classNames("Mini-Ripple", props.className)}>
      {"ripple"}
    </span>
  );
};

export default Ripple;
