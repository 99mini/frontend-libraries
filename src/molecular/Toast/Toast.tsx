import React from 'react';
import classNames from "classnames";
import './Toast.scss'

export type ToastProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const Toast = ({...props}: ToastProps) => {
  return (
    <div {...props} className={classNames("Mini-Toast", props.className)}>
      {props.children ?? "Toast"}
    </div>
  );
}

export default Toast;
