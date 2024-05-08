import type { Meta } from "@storybook/react";

import React from "react";

import CheckBox, { CheckBoxProps } from "./CheckBox";
import styles from "./CheckBox.scss";
import classNames from "classnames";

export default {
  component: CheckBox,
  title: "Atom/CheckBox",
  tags: ["autodocs"],
} satisfies Meta<typeof CheckBox>;

const cx = classNames.bind(styles);

const Template = (args: CheckBoxProps) => <CheckBox {...args} />;

const BasicTemplate = (args: CheckBoxProps) => {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <CheckBox />
      <CheckBox checked />
      <CheckBox disabled />
      <CheckBox disabled checked />
    </div>
  );
};

const LabelTemplate = (args: CheckBoxProps) => {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <CheckBox label="default" {...args} />
      <CheckBox checked label="checked" {...args} />
      <CheckBox disabled label="disabled" {...args} />
      <CheckBox required label="required" {...args} />
    </div>
  );
};

export const Basic = BasicTemplate.bind({});
export const Label = LabelTemplate.bind({});

export const Default = Template.bind({});
export const Required = Template.bind({});
export const Disabled = Template.bind({});
export const DisabledWithChecked = Template.bind({});
export const WithLabel = Template.bind({ lable: "label" });

Required.args = {
  CheckBox: {
    title: "Required CheckBox",
    state: "CheckBox",
  },
  required: true,
};

Disabled.args = {
  CheckBox: {
    title: "Disable CheckBox",
    state: "CheckBox",
  },
  disabled: true,
};

DisabledWithChecked.args = {
  CheckBox: {
    title: "Disable CheckBox",
    state: "CheckBox",
  },
  disabled: true,
  checked: true,
};

WithLabel.arg = {
  CheckBox: {
    title: "WithLabel CheckBox",
    state: "CheckBox",
  },
  disabled: false,
  required: false,
  labelPlacement: "right",
};
