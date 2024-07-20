import React from "react";
import classNames from "classnames";
import "./TextField.css";

type TextInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  TextInputPropsType;

type TextInputPropsType = {};

const TextInput = ({ type = "text", ...props }: TextInputProps) => {
  return (
    <input
      type={type}
      {...props}
      className={classNames("YnI-TextField", props.className)}
    />
  );
};

type MultiLineTextFieldProps = React.DetailedHTMLProps<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  HTMLTextAreaElement
> &
  MuiltilineTextFieldPropsType;

type MuiltilineTextFieldPropsType = {};

const MultiLineTextField = ({ ...props }: MultiLineTextFieldProps) => {
  return (
    <textarea
      {...props}
      className={classNames("YnI-TextField", props.className)}
    />
  );
};
export type TextFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  React.DetailedHTMLProps<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    HTMLTextAreaElement
  > &
  TextFieldPropsType;

type TextFieldPropsType = {
  muiltiline?: boolean;
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
