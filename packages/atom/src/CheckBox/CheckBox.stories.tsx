import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import CheckBox, { CheckBoxProps } from "./CheckBox";

const meta = {
  component: CheckBox,
  title: "Atom/CheckBox",
  tags: ["autodocs"],
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof CheckBox>;

const Template = ({ ...args }) => <CheckBox {...args} />;

const BasicTemplate = ({ ...args }) => {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <CheckBox />
      <CheckBox checked />
      <CheckBox disabled />
      <CheckBox disabled checked />
    </div>
  );
};

const LabelTemplate = ({ ...args }) => {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <CheckBox label="default" {...args} />
      <CheckBox checked label="checked" {...args} />
      <CheckBox disabled label="disabled" {...args} />
      <CheckBox required label="required" {...args} />
    </div>
  );
};

export const Basic: Story = {
  render: Template,
};
export const Label: Story = {
  render: LabelTemplate,
};

export const Default: Story = {
  render: BasicTemplate,
};
export const Required: Story = {
  render: BasicTemplate,
};
export const Disabled: Story = {
  render: BasicTemplate,
};
export const DisabledWithChecked: Story = {
  render: BasicTemplate,
};
export const WithLabel: Story = {
  args: {
    label: "label",
  },
  render: LabelTemplate,
};
