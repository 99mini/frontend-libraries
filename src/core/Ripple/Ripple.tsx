import React from "react";
import classNames from "classnames";
import "./Ripple.scss";

export type RippleProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & { parentRef: React.RefObject<HTMLElement> };

const Ripple = ({ ...props }: RippleProps) => {
  const handleRippleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const ripple = document.createElement("div");
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    // (ripple.className = "animate"),
    //   (ripple.style.left = `${e.x - rect.left}px`),
    //   (ripple.style.top = `${e.y - rect.top}px`),
    //   (ripple.style.background = `#${a.dataset.color !== undefined ? a.dataset.color : "bdc3c7"}`),
    //   ripple.style.setProperty("--material-scale", a.offsetWidth),
    //   a.append(ripple),
    //   setTimeout(function () {
    //     ripple.parentNode.removeChild(ripple);
    //   }, 500);
  };
  return <span {...props} className={classNames("Mini-Ripple", props.className)} onClick={handleRippleClick} />;
};

export default Ripple;
