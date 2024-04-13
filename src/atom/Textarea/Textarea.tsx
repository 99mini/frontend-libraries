import React from 'react';
import classNames from "classnames";
import './Textarea.scss'

export type TextareaProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

const Textarea = ({...props}: TextareaProps) => {
  return (
    <div {...props} className={classNames("Mini-Textarea", props.className)}>
      {props.children ?? "Textarea"}
    </div>
  );
}

export default Textarea;
