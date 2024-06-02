import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import SingleCalendar, { CalendarProps } from "./SingleCalendar";
import { MonthType } from "@99mini/utils";

const meta = {
  component: SingleCalendar,
  title: "calendar/SingleCalendar",
  tags: ["autodocs"],
} satisfies Meta<typeof SingleCalendar>;

export default meta;

type Story = StoryObj<typeof SingleCalendar>;

const yaer = new Date().getFullYear();
const month = (new Date().getMonth() + 1) as MonthType;

const Template = (args: CalendarProps) => {
  return <SingleCalendar {...args}></SingleCalendar>;
};

export const Default: Story = {
  args: {
    year: yaer,
    month: month,
  },
  render: Template,
};

export const Readonly: Story = {
  args: {
    year: yaer,
    month: month,
    readonly: true,
  },
  render: Template,
};
