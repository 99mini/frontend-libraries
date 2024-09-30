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
      className={classNames(
        "YnI-TextField",
        "YnI-TextField-Multi",
        props.className,
      )}
    />
  );
};

export type TextFieldProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  TextFieldPropsType;

type TextFieldPropsType = {
  muiltiline?: boolean;
  inputProps?: TextInputProps;
  multiLineTextFieldProps?: MultiLineTextFieldProps;
};

export const TextField = ({
  muiltiline = false,
  inputProps = {},
  multiLineTextFieldProps = {},
  ...props
}: TextFieldProps) => {
  return (
    <div
      {...props}
      className={classNames("YnI-TextField-Root", props.className)}
    >
      {muiltiline ? (
        <MultiLineTextField {...multiLineTextFieldProps} />
      ) : (
        <TextInput {...inputProps} />
      )}
    </div>
  );
};

export default TextField;
