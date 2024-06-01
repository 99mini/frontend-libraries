import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./Ripple.css";

import { isMouseEvent, isTouchEvent } from "@99mini/utils";

export type RippleProps = Omit<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >,
  keyof RipplePropsType
> &
  RipplePropsType;

type RipplePropsType = {
  parentRef: React.RefObject<HTMLElement | null>;
  isTouch?: boolean;
};

export const Ripple = ({ ...props }: RippleProps) => {
  const { parentRef, isTouch = false, ...htmlProps } = props;

  const [parentEl, setParentEl] = useState<HTMLElement | null>(null);
  const rippleRootRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const parentEl = parentRef.current;
    parentEl?.style.setProperty("position", "relative");
    setParentEl(parentEl);
  }, []);

  useEffect(() => {
    const rippleRootEl = rippleRootRef.current;
    const timer: ReturnType<typeof setTimeout>[] = [];

    if (!parentEl || !rippleRootRef || !rippleRootEl) {
      return;
    }

    const appendAnimateEl = (event: MouseEvent | TouchEvent) => {
      if (isTouch) {
        const ripple = document.createElement("div");

        ripple.className = "animate";
        ripple.style.left = `50%`;
        ripple.style.top = `50%`;
        ripple.style.setProperty("--material-scale", `${parentEl.offsetWidth}`);

        rippleRootEl.append(ripple);
        return;
      }

      // TODO: 마우스로 터치할 때 두 번 실행됨
      if (isMouseEvent(event)) {
        const ripple = document.createElement("div");
        const rect = rippleRootEl.getBoundingClientRect();
        ripple.className = "animate";
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        ripple.style.setProperty("--material-scale", `${parentEl.offsetWidth}`);

        rippleRootEl.append(ripple);
        return;
      }

      if (isTouchEvent(event)) {
        const ripple = document.createElement("div");
        const rect = rippleRootEl.getBoundingClientRect();
        ripple.className = "animate";
        ripple.style.left = `${event.touches[0].clientX - rect.left}px}`;
        ripple.style.top = `${event.touches[0].clientX - rect.top}px}`;
        ripple.style.setProperty("--material-scale", `${parentEl.offsetWidth}`);

        rippleRootEl.append(ripple);
        return;
      }
    };

    const removeAnimateEl = (_event: MouseEvent | TouchEvent) => {
      const currentTimer = setTimeout(() => {
        const animateEl = rippleRootEl.querySelector(".animate");

        if (!animateEl) {
          return;
        }
        rippleRootEl.removeChild(animateEl);
      }, 500);

      timer.push(currentTimer);
    };

    parentEl.addEventListener("touchstart", appendAnimateEl);
    parentEl.addEventListener("mousedown", appendAnimateEl);

    parentEl.addEventListener("touchend", removeAnimateEl);
    parentEl.addEventListener("mouseup", removeAnimateEl);
    parentEl.addEventListener("mouseleave", removeAnimateEl);

    return () => {
      parentEl.removeEventListener("touchstart", appendAnimateEl);
      parentEl.removeEventListener("mousedown", appendAnimateEl);

      parentEl.removeEventListener("mouseup", removeAnimateEl);
      parentEl.removeEventListener("mouseleave", removeAnimateEl);
      parentEl.removeEventListener("touchend", removeAnimateEl);

      timer.forEach(clearTimeout);
    };
  }, [parentEl, rippleRootRef]);

  return (
    <span
      {...htmlProps}
      className={classNames("YnI-Ripple-root", htmlProps.className)}
      ref={rippleRootRef}
    />
  );
};

export default Ripple;
