import React, { useEffect, useRef } from "react";
import classNames from "classnames";

import { ProgressProps } from "../Progress/Progress";

import { formatUnit } from "@99mini/utils";

import "../Progress/Progress.css";
import "./LinearProgress.css";

export type LinearProgressProps = ProgressProps & LinearProgressPropsType;

type LinearProgressPropsType = {
  height?: number | string;
};

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
   * @default `rgb(87, 87, 233)`
   */
  color = "rgb(87, 87, 233)",
  /**
   * The label of the progress.
   * @default `undefined` - show the value of the progress.
   * `string` - show the string as the label.
   */
  label,
  /**
   * The label placement of the progress.
   * @default `left`
   */
  labelPlacement = "left",
  /**
   * Show the label of the progress.
   * @default `false`
   */
  showLabel = false,
  /**
   * The height of the progress.
   */
  height = 4,
  ...props
}: LinearProgressProps) => {
  const linearProgressElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const styleProperties = [
      ["--linear-progress-height", formatUnit(height)],
      ["--linear-progress-color", color],
    ];

    styleProperties.forEach(([property, value]) => {
      linearProgressElementRef.current?.style.setProperty(property, value);
    });
  }, []);

  return (
    <div
      {...props}
      className={classNames(
        "YnI-Progress-Root",
        "YnI-LinearProgress",
        { [`YnI-Progress-Label--${labelPlacement}`]: labelPlacement },
        props.className,
      )}
      ref={linearProgressElementRef}
    >
      {showLabel && (
        <span className={classNames("YnI-Progress-Label")}>
          {label}
          {!label &&
            (varient === "determinate" || varient === "buffer") &&
            `${Math.min(value, 100).toFixed(0)}%`}
        </span>
      )}
      <div className={classNames("YnI-LinearProgress-Bar")}>
        {varient === "buffer" && (
          <div
            className="YnI-LinearProgress-buffer"
            style={{
              width: formatUnit(Math.min(valueBuffer, 100), "%"),
            }}
          />
        )}
        <div
          className={classNames("YnI-LinearProgress-Indicator", {
            "YnI-LinearProgress-indeterminate": varient === "indeterminate",
          })}
          style={{
            width:
              varient !== "indeterminate"
                ? formatUnit(Math.min(value, 100), "%")
                : undefined,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

export default LinearProgress;
