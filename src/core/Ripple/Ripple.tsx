import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./Ripple.scss";

import { isMouseEvent, isTouchEvent } from "util/event";

export type RippleProps = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, keyof RipplePropsType> & RipplePropsType;

type RipplePropsType = { parentRef: React.RefObject<HTMLElement>; isTouch?: boolean };

const Ripple = ({ ...props }: RippleProps) => {
  const { parentRef, isTouch = false, ...htmlProps } = props;

  const [parentEl, setParentEl] = useState<HTMLElement | null>(null);
  const rippleRootRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (parentRef && parentRef.current) {
      setParentEl(parentRef.current);
    }
  }, []);

  useEffect(() => {
    const rippleRootEl = rippleRootRef.current;
    const timer: ReturnType<typeof setTimeout>[] = [];

    if (!parentEl || !rippleRootRef || !rippleRootEl) {
      return;
    }

    const appendAnimateEl = (event: MouseEvent | TouchEvent) => {
      if (isTouch && isTouchEvent(event)) {
        const ripple = document.createElement("div");

        ripple.className = "animate";
        ripple.style.left = `50%`;
        ripple.style.top = `50%`;
        ripple.style.setProperty("--material-scale", `${parentEl.offsetWidth}`);

        rippleRootEl.append(ripple);
        return;
      }

      if (isMouseEvent(event)) {
        const ripple = document.createElement("div");
        const rect = rippleRootEl.getBoundingClientRect();
        ripple.className = "animate";
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        ripple.style.setProperty("--material-scale", `${parentEl.offsetWidth}`);

        rippleRootEl.append(ripple);
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

  return <span {...htmlProps} className={classNames("Mini-Ripple-root", htmlProps.className)} ref={rippleRootRef} />;
};

export default Ripple;
