import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import CircularProgress from "./CircularProgress";

const meta = {
  component: CircularProgress,
  title: "atom/CircularProgress",
  tags: ["autodocs"],
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof CircularProgress>;

const Template = ({ ...args }) => { 
  return (
    <CircularProgress {...args} ></CircularProgress>
  )
};

export const Default: Story = {
  args: {},
  render: Template,
};
