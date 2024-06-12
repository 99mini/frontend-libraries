import type { Meta, StoryObj } from "@storybook/react";

import React, { useEffect } from "react";

import CircularProgress from "./CircularProgress";

const meta = {
  component: CircularProgress,
  title: "atom/CircularProgress",
  tags: ["autodocs"],
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof CircularProgress>;

const Template = ({ ...args }) => {
  return <CircularProgress {...args}></CircularProgress>;
};

const DeterminateTemplate = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + Math.random() * 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <CircularProgress {...args} value={value}></CircularProgress>;
};

const BufferTemplate = ({ ...args }) => {
  const [value, setValue] = React.useState(0);
  const [valueBuffer, setValueBuffer] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + Math.random() * 10));
      setValueBuffer((prev) =>
        prev >= 100 ? 0 : value + prev + Math.random() * 10,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgress
      {...args}
      value={value}
      valueBuffer={valueBuffer}
    ></CircularProgress>
  );
};

export const Default: Story = {
  args: {},
  render: Template,
};

export const Determinate: Story = {
  args: { varient: "determinate" },
  render: DeterminateTemplate,
};

export const Buffer: Story = {
  args: { varient: "buffer" },
  render: BufferTemplate,
};
