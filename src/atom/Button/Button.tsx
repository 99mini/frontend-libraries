import React from "react";
import classNames from "classnames";
import "./Button.scss";

import Ripple from "@core/Ripple";

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    href?: string;
  };

const Button = ({ href, ...props }: ButtonProps) => {
  if (href) {
    return (
      <a href={href} {...props} className={classNames("Mini-Button Mini-Button-anchor", props.className)}>
        <Ripple />
        {props.children ?? "Button"}
      </a>
    );
  }
  return (
    <button {...props} className={classNames("Mini-Button", props.className)}>
      {props.children ?? "Button"}
    </button>
  );
};

export default Button;
