import classNames from "classnames";
import React from "react";
import "./Button.scss";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & {
    href?: string;
  };

const Button = ({ href, ...props }: ButtonProps) => {
  if (href) {
    return (
      <a
        href={href}
        {...props}
        className={classNames(
          "Mini-button Mini-button-anchor",
          props.className
        )}
      >
        {props.children ?? "Button"}
      </a>
    );
  }
  return (
    <button {...props} className={classNames("Mini-button", props.className)}>
      {props.children ?? "Button"}
    </button>
  );
};

export default Button;
