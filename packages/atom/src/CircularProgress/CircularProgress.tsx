import React, { useEffect, useRef } from "react";
import classNames from "classnames";

import { ProgressProps } from "../Progress/Progress";

import "../Progress/Progress.css";
import "./CircularProgress.css";
import { formatUnit } from "@99mini/utils";

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
   * @default `rgb(87, 87, 233)`
   */
  color = "rgb(87, 87, 233)",
  ...props
}: CircularProgressProps) => {
  const rootElementRef = useRef<HTMLDivElement>(null);
  const circleElementRef = useRef<HTMLDivElement>(null);
  const progressElementRef = useRef<HTMLProgressElement>(null);

  useEffect(() => {
    const styleProperties = [
      ["--circular-progress-size", formatUnit(size)],
      ["--circular-progress-thickness", formatUnit(thickness)],
      ["--circular-progress-color", color],
    ];

    styleProperties.forEach(([property, value]) => {
      rootElementRef.current?.style.setProperty(property, value);
    });
  }, [size, thickness, color]);

  useEffect(() => {
    const styleProperties = [
      ["--circular-progress-value", formatUnit(value, "%")],
      ["--circular-progress-value-buffer", formatUnit(valueBuffer, "%")],
    ];

    styleProperties.forEach(([property, value]) => {
      circleElementRef.current?.style.setProperty(property, value);
    });
  }, [value, valueBuffer]);

  return (
    <div
      {...props}
      className={classNames(
        "YnI-Progress-Root",
        "YnI-CircularProgress",
        props.className,
      )}
      ref={rootElementRef}
    >
      <div
        className={classNames(
          "YnI-CircularProgress-Circle",
          `YnI-CircularProgress-${varient}`,
        )}
        ref={circleElementRef}
      >
        <progress
          className={classNames("YnI-CircularProgress-Progress")}
          value={value}
          max={100}
          ref={progressElementRef}
        ></progress>
      </div>
    </div>
  );
};

export default CircularProgress;
