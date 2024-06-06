import React from "react";
import classNames from "classnames";
import "./Badge.css";

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

export const Badge = ({
  badgeContent,
  color,
  max,
  position = { vertical: "top", horizontal: "right" },
  ...props
}: BadgeProps) => {
  const { className, children, ...rest } = props;
  return (
    <span {...rest} className={classNames("YnI-Badge-Root", className)}>
      {children}
      <span
        style={{ backgroundColor: color }}
        className={classNames(
          "YnI-Badge",
          badgeContent === undefined && "YnI-Badge-dot",
          max &&
            badgeContent !== undefined &&
            badgeContent > max &&
            "YnI-Badge-max",
          `YnI-Badge-${position.vertical}-${position.horizontal}`,
        )}
      >
        {badgeContent && Math.min(badgeContent, max || badgeContent)}
      </span>
    </span>
  );
};

export default Badge;
