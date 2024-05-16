import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import Calendar, { CalendarProps } from "./Calendar";
import styles from "./Calendar.scss";
import classNames from "classnames";

const meta = {
  component: Calendar,
  title: "calendar/Calendar",
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof Calendar>;

const cx = classNames.bind(styles);

const Template = (args: CalendarProps) => {
  return <Calendar {...args}></Calendar>;
};

export const Default: Story = Template.bind({});
Default.args = {
  year: 2024,
  month: 5,
};
