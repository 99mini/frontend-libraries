import type { Meta, StoryObj } from "@storybook/react";

import React, { useEffect } from "react";

import LinearProgress from "./LinearProgress";

const meta = {
  component: LinearProgress,
  title: "atom/LinearProgress",
  tags: ["autodocs"],
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof LinearProgress>;

const Template = ({ ...args }) => {
  return <LinearProgress {...args}></LinearProgress>;
};

const DeterminateTemplate = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + Math.random() * 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <LinearProgress {...args} value={value}></LinearProgress>
    </div>
  );
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
    <div style={{ width: "100%" }}>
      <LinearProgress
        {...args}
        value={value}
        valueBuffer={valueBuffer}
      ></LinearProgress>
    </div>
  );
};

export const Default: Story = {
  args: {},
  render: Template,
};

export const Indeterminate: Story = {
  args: {
    varient: "indeterminate",
  },
  render: Template,
};

export const Determinate: Story = {
  args: {
    varient: "determinate",
  },
  render: DeterminateTemplate,
};

export const Buffer: Story = {
  args: {
    varient: "buffer",
  },
  render: BufferTemplate,
};

export const Color: Story = {
  args: {
    color: "red",
    varient: "indeterminate",
  },
  render: Template,
};

export const ColorBuffer: Story = {
  args: {
    color: "red",
    varient: "buffer",
  },
  render: BufferTemplate,
};
