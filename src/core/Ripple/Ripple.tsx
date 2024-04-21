import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./Ripple.scss";

import { isMouseEvent } from "util/event";

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
      const ripple = document.createElement("div");
      const rect = rippleRootEl.getBoundingClientRect();
      ripple.className = "animate";
      ripple.style.left = !isTouch && isMouseEvent(event) ? `${event.clientX - rect.left}px` : `50%`;
      ripple.style.top = !isTouch && isMouseEvent(event) ? `${event.clientY - rect.top}px` : `50%`;
      ripple.style.setProperty("--material-scale", `${parentEl.offsetWidth}`);

      rippleRootEl.append(ripple);
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
