import React from "react";
import classNames from "classnames";

import { ProgressProps } from "../Progress/Progress";

import "../Progress/Progress.css";
import "./LinearProgress.css";

export type LinearProgressProps = ProgressProps & LinearProgressPropsType;

type LinearProgressPropsType = {};

export const LinearProgress = ({
  /**
   * varient of the progress.
   * @default `indeterminate`
   *
   * - `buffer` - Linear progress with buffer.
   * - `determinate` - Linear progress with determinate value.
   * - `indeterminate` - Linear progress with indeterminate value.
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
}: LinearProgressProps) => {
  return (
    <div
      {...props}
      className={classNames(
        "YnI-Progress-Root",
        "YnI-LinearProgress",
        props.className,
      )}
    >
      <div className={classNames("YnI-LinearProgress-Bar")}>
        {varient === "buffer" && (
          <div
            className="YnI-LinearProgress-Buffer"
            style={{
              width: `${valueBuffer}%`,
            }}
          />
        )}
        <div
          className={classNames("YnI-LinearProgress-Indicator", {
            "YnI-LinearProgress-Indeterminate": varient === "indeterminate",
          })}
          style={{
            width: varient !== "indeterminate" ? `${value}%` : undefined,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default LinearProgress;
