import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import LinearProgress from "./LinearProgress";

const meta = {
  component: LinearProgress,
  title: "atom/LinearProgress",
  tags: ["autodocs"],
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof LinearProgress>;

const Template = ({ ...args }) => { 
  return (
    <LinearProgress {...args} ></LinearProgress>
  )
};

export const Default: Story = {
  args: {},
  render: Template,
};
