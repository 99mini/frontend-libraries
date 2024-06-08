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
};
