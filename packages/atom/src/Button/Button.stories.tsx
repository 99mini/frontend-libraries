import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import Button, { ButtonProps } from "./Button";
import classNames from "classnames/bind";

const meta = {
  component: Button,
  title: "Atom/Button",
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

const Template = ({ ...args }) => <Button {...args} />;

export const Default: Story = {
  render: Template,
};

export const AnchorButton: Story = {
  args: {
    href: "/",
  },
  render: Template,
};
