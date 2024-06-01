import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import SingleCalendar, { CalendarProps } from "./SingleCalendar";

const meta = {
  component: SingleCalendar,
  title: "calendar/SingleCalendar",
  tags: ["autodocs"],
} satisfies Meta<typeof SingleCalendar>;

export default meta;

type Story = StoryObj<typeof SingleCalendar>;

const Template = (args: CalendarProps) => {
  return <SingleCalendar {...args}></SingleCalendar>;
};

export const Default: Story = {
  args: {
    year: 2024,
    month: 5,
  },
  render: Template,
};
