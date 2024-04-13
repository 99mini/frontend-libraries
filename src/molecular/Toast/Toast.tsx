import React, { createContext, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import "./Toast.scss";

export type ToastProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & ToastType & ToastStateType;

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

type ToastStateType = {
  open: boolean;
  onClose: () => void;
};

const Toast = ({ ...props }: ToastProps) => {
  const { message, type, duration, open, onClose, ...htmlProps } = { ...props };

  const [toast, setToast] = useState<ToastType>({ message: message, type: type ?? "default", duration: duration ?? 3000 });
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
    <ToastContext.Provider value={{ toast, setToast }}>
      <div className={classNames("Mini-Toast-root", open ? "open" : isAnimated ? "close" : "fade-out", props.className)}>
        <div className={classNames("Mini-Toast")} {...htmlProps}>
          {!props.children && (toast.message ?? "toast")}
          {props.children}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

const ToastContext = createContext<{
  toast: ToastType;
  setToast: React.Dispatch<React.SetStateAction<ToastType>>;
}>({
  toast: {},
  setToast: () => {},
});

export default Toast;
