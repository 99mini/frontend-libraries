import React from "react";
import classNames from "classnames";
import "./TextField.css";

export type TextFieldProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > &
  TextFieldPropsType;

type MultiLineTextFieldProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  MuiltilineTextFieldPropsType;

type TextInputProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  TextInputPropsType;

type TextInputPropsType = {};

type TextFieldPropsType = {
  muiltiline?: boolean;
};

type MuiltilineTextFieldPropsType = {};

const TextInput = ({ ...props }: TextInputProps) => {
  return (
    <input
      {...props}
      className={classNames("YnI-TextField", props.className)}
    />
  );
};

const MultiLineTextField = ({ ...props }: MultiLineTextFieldProps) => {
  return (
    <textarea
      {...props}
      className={classNames("YnI-TextField", props.className)}
    />
  );
};

export const TextField = ({ muiltiline, ...props }: TextFieldProps) => {
  return (
    <div
      {...props}
      className={classNames("YnI-TextField-Root", props.className)}
    >
      {muiltiline ? (
        <MultiLineTextField {...props} />
      ) : (
        <TextInput {...props} />
      )}
    </div>
  );
};

export default TextField;
