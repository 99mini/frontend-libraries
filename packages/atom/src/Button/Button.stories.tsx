import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import Button, { ButtonProps } from "./Button";
import classNames from "classnames/bind";
import styles from "./Button.scss";

const meta = {
  component: Button,
  title: "Atom/Button",
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

const cx = classNames.bind(styles);

const Template = (args: ButtonProps) => <Button {...args} />;

export const Default = Template.bind({});

export const AnchorButton = Template.bind({});
AnchorButton.args = {
  href: "/",
};
