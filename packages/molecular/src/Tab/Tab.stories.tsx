import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import React from "react";

import Tab, { TabProps, Tabs } from "./Tab";
import classNames from "classnames/bind";
import styles from "./Tab.scss";

const meta = {
  component: Tab,
  title: "molecular/Tab",
  tags: ["autodocs"],
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

const cx = classNames.bind(styles);

const Template = (args: TabProps) => {
  const handleClick1 = () => console.log("button 1");
  const handleClick2 = () => console.log("button 2");
  const handleClick3 = () => console.log("button 3");
  return (
    <Tabs>
      <Tab onClick={handleClick1}>button 1</Tab>
      <Tab onClick={handleClick2}>button 2</Tab>
      <Tab onClick={handleClick3}>button 3</Tab>
    </Tabs>
  );
};

const DifferentSizesTemplate = (args: TabProps) => {
  const handleClick1 = () => console.log("button 1");
  const handleClick2 = () => console.log("short");
  const handleClick3 = () => console.log("long button size...!");
  return (
    <Tabs>
      <Tab onClick={handleClick1}>button 1</Tab>
      <Tab onClick={handleClick2}>short</Tab>
      <Tab onClick={handleClick3}>long button size...!</Tab>
    </Tabs>
  );
};

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    for (const button of buttons) {
      await userEvent.click(button);
      await sleep(1000);
    }
  },
  args: {},
  render: Template,
};

export const DifferentSizes: Story = {
  args: {},
  render: DifferentSizesTemplate,
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
