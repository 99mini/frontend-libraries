import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import SingleCalendar, { CalendarProps } from "./SingleCalendar";
import styles from "./SingleCalendar.scss";
import classNames from "classnames";

const meta = {
  component: SingleCalendar,
  title: "calendar/SingleCalendar",
  tags: ["autodocs"],
} satisfies Meta<typeof SingleCalendar>;

export default meta;

type Story = StoryObj<typeof SingleCalendar>;

const cx = classNames.bind(styles);

const Template = (args: CalendarProps) => {
  return <SingleCalendar {...args}></SingleCalendar>;
};

export const Default: Story = Template.bind({});
Default.args = {
  year: 2024,
  month: 5,
};
