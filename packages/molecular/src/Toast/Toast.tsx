import React, { useEffect, useState } from "react";
import classNames from "classnames";
import "./Toast.css";

export type ToastProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  ToastPropsType;

export type ToastType = {
  message?: string;
  /**
   * @description Toast type
   * 1. info
   * 2. success
   * 3. error
   * 4. warning
   * 5. default
   */
  type?: "info" | "success" | "error" | "warning" | "default";
  /**
   * @description How long the toast is visible (ms)
   */
  duration?: number;
};

type ToastPropsType = {
  open: boolean;
  onClose: () => void;
} & ToastType;

const ToastIcon = ({ iconType }: { iconType: ToastType["type"] }) => {
  switch (iconType) {
    case "success":
      return <></>;
    case "info":
      return <></>;
    case "error":
      return <></>;
    case "warning":
      return <></>;

    case undefined || "default":
      return <></>;
    default:
      return <></>;
  }
};

export const Toast = ({ ...props }: ToastProps) => {
  const { message, type, duration, open, onClose, ...htmlProps } = { ...props };

  const toast: ToastType = {
    message: message,
    type: type ?? "default",
    duration: duration ?? 3000,
  };

  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (open) {
      setIsAnimated(false);
      timer = setTimeout(() => {
        onClose();
      }, toast.duration);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return (
    <div
      className={classNames(
        "YnI-Toast-Root",
        open ? "open" : isAnimated ? "close" : "fade-out",
      )}
    >
      <div
        {...htmlProps}
        className={classNames(
          "YnI-Toast",
          toast.type && toast.type !== "default" ? "YnI-Toast-layout" : "",
          props.className,
        )}
      >
        {props.children || (
          <>
            {toast.type && toast.type !== "default" && (
              <div className={classNames("YnI-Toast-icon")}>
                <ToastIcon iconType={toast.type} />
              </div>
            )}
            <span className={classNames("YnI-Toast-message")}>
              {toast.message ?? "toast"}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Toast;
