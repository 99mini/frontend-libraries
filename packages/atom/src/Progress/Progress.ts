import React from "react";

export type ProgressProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ProgressPropsType;

type ProgressPropsType = {
  varient?: "buffer" | "determinate" | "indeterminate";
  value?: number;
  valueBuffer?: number;
  color?: string;
  label?: string;
  labelPlacement?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "right"
    | "left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  showLabel?: boolean;
};
