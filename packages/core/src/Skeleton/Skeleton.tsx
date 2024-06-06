import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import "./Skeleton.css";

export type SkeletonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  SkeletonPropsType;

type SkeletonPropsType = {
  /**
   * The animation of the skeleton.
   * @default "wave"
   * @type `wave` | `pulse` | `false`
   *
   * - `wave` - The skeleton will have a wave animation.
   * - `pulse` - The skeleton will have a pulse animation.
   * - false - The skeleton will not have any animation.
   */
  animation?: "wave" | "pulse" | false;
  /**
   * The width of the skeleton.
   */
  width?: string | number;
  /**
   * The height of the skeleton.
   */
  height?: string | number;
  /**
   * The color of the skeleton.
   * @example "red"
   */
  color?: string;
  /**
   * The variant of the skeleton.
   * @default "text"
   * @type `text` | `rect` | `circle` | `rounded`
   *
   * - `text` - The skeleton will have a text variant.
   * - `rect` - The skeleton will have a rectangle variant.
   * - `circle` - The skeleton will have a circle variant.
   * - `rounded` - The skeleton will have a round rectangle variant.
   */
  variant?: "text" | "rect" | "circle" | "rounded";
};

/**
 * Skeleton is used to create a placeholder loading effect.
 *
 * It is used to create a skeleton screen effect while the content is loading.
 *
 * It can be used to create a skeleton effect for text, rectangle, circle, and rounded rectangle.
 *
 * It can be used to create a wave or pulse animation effect.
 *
 * @example
 * ```jsx
 * <Skeleton />
 * <Skeleton animation="wave" height={200} variant="rect" />
 * ```
 */
export const Skeleton = ({
  animation = "wave",
  variant = "text",
  width,
  height,
  color,
  ...props
}: SkeletonProps) => {
  const skeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (color && skeletonRef.current) {
      skeletonRef.current.style.setProperty("--skeleton-color", color);
    }
  }, []);

  return (
    <div
      {...props}
      className={classNames("YnI-Skeleton-Root", props.className, {
        [`YnI-Skeleton--${variant}`]: variant,
        [`YnI-Skeleton--rect`]: variant === "rounded",
        [`YnI-Skeleton--${animation}`]: animation,
      })}
      style={{ width, height, ...props.style }}
      ref={skeletonRef}
    >
      {props.children}
    </div>
  );
};

export default Skeleton;
