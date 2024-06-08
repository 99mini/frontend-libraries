import React from "react";
import classNames from "classnames";

import { ProgressProps } from "../Progress/Progress";

import "../Progress/Progress.css";
import "./CircularProgress.css";

export type CircularProgressProps = ProgressProps & CircularProgressPropsType;

type CircularProgressPropsType = {
  size?: number | string;
  thickness?: number;
};

export const CircularProgress = ({
  /**
   * The size of the circle.
   */
  size = 40,
  /**
   * The thickness of the circle.
   */
  thickness = 3,
  /**
   * varient of the progress.
   * @default `indeterminate`
   *
   * - `buffer` - Circular progress with buffer.
   * - `determinate` - Circular progress with determinate value.
   * - `indeterminate` - Circular progress with indeterminate value.
   */
  varient = "indeterminate",
  /**
   * The value of the progress.
   *
   * 0 to 100
   */
  value = 0,
  /**
   * The value of the buffer.
   *
   * 0 to 100
   */
  valueBuffer = 0,
  /**
   * The color of the progress.
   */
  color,
  ...props
}: CircularProgressProps) => {
  return (
    <div
      {...props}
      className={classNames(
        "YnI-Progress-Root",
        "YnI-CircularProgress",
        props.className,
      )}
    >
      {props.children ?? "CircularProgress"}
    </div>
  );
};

export default CircularProgress;
