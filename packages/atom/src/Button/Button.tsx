import React, { useRef } from "react";
import classNames from "classnames";
import "./Button.scss";

import Ripple from "@core/Ripple";

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    href?: string;
  };

const Button = ({ href, ...props }: ButtonProps) => {
  if (href) {
    const anchoreRef = useRef<HTMLAnchorElement>(null);
    return (
      <a href={href} {...props} className={classNames("Mini-Button Mini-Button-anchor", props.className)} ref={anchoreRef}>
        <Ripple parentRef={anchoreRef} />
        <span>{props.children ?? "Anchor Button"}</span>
      </a>
    );
  }

  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <button {...props} className={classNames("Mini-Button", props.className)} ref={buttonRef}>
      <Ripple parentRef={buttonRef} />
      <span>{props.children ?? "Button"}</span>
    </button>
  );
};

export default Button;