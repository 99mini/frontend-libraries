import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import TextField from "./TextField";

const meta = {
  component: TextField,
  title: "atom/TextField",
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof TextField>;

const Template = ({ ...args }) => {
  return <TextField {...args}></TextField>;
};

const MultiLineTemplate = ({ ...args }) => {
  return <TextField {...args}></TextField>;
};

const TextInputTemplate = ({ ...args }) => {
  return <TextField {...args}></TextField>;
};

const NumberInputTemplate = ({ ...args }) => {
  return <TextField {...args}></TextField>;
};

export const Default: Story = {
  args: {},
  render: Template,
};

export const TextInput: Story = {
  args: {},
  render: TextInputTemplate,
};

export const NumberInput: Story = {
  args: { inputProps: { type: "number" } },
  render: NumberInputTemplate,
};

export const MultiLine: Story = {
  args: { muiltiline: true },
  render: MultiLineTemplate,
};
