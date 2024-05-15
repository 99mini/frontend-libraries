import React, { useEffect, useRef } from "react";
import classNames from "classnames";

export type ClickOutsideListenerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ClickOutsideListenerPropsType;

type ClickOutsideListenerPropsType = {
  onClickOutside: () => void;
};

export const ClickOutsideListener = ({
  ...props
}: ClickOutsideListenerProps) => {
  const { onClickOutside } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutsideElement = ref.current;

    if (!clickOutsideElement) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!clickOutsideElement.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 300);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div
      {...props}
      className={classNames("Mini-ClickOutsideListener", props.className)}
      ref={ref}
    >
      {props.children}
    </div>
  );
};

export default ClickOutsideListener;
