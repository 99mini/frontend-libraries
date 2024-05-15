import React from "react";
import classNames from "classnames";
import "./Badge.scss";

export type BadgeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> &
  BadgePropsType;

type BadgePropsType = {
  badgeContent?: number;
  color?: string;
  max?: number;
  position?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  };
};

const Badge = ({
  badgeContent,
  color,
  max,
  position = { vertical: "top", horizontal: "right" },
  ...props
}: BadgeProps) => {
  const { className, children, ...rest } = props;
  return (
    <span {...rest} className={classNames("Mini-Badge-root", className)}>
      {children}
      <span
        style={{ backgroundColor: color }}
        className={classNames(
          "Mini-Badge",
          badgeContent === undefined && "Mini-Badge-dot",
          max &&
            badgeContent !== undefined &&
            badgeContent > max &&
            "Mini-Badge-max",
          `Mini-Badge-${position.vertical}-${position.horizontal}`,
        )}
      >
        {badgeContent && Math.min(badgeContent, max || badgeContent)}
      </span>
    </span>
  );
};

export default Badge;
