import type { Meta, StoryObj } from "@storybook/react";

import React from "react";
import Skeleton from "./Skeleton";

const meta = {
  component: Skeleton,
  title: "Core/Skeleton",
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof Skeleton>;

const Template = ({ ...args }) => {
  return <Skeleton {...args}>{args.children}</Skeleton>;
};

const CardTemplate = ({ ...args }) => {
  return (
    <div style={{ width: 300 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Skeleton
          animation={args.animation}
          style={{ marginBottom: 20 }}
          variant="circle"
        />
        <Skeleton
          animation={args.animation}
          style={{ marginBottom: 20 }}
          width={200}
          variant="text"
        />
      </div>
      <Skeleton animation={args.animation} height={200} variant="rect" />
    </div>
  );
};

export const Default: Story = {
  render: Template,
};

export const Wave: Story = {
  args: {
    animation: "wave",
  },
  render: Template,
};

export const Pulse: Story = {
  args: {
    animation: "pulse",
  },
  render: Template,
};

export const NoAnimation: Story = {
  args: {
    animation: false,
  },
  render: Template,
};

export const Text: Story = {
  args: {
    variant: "text",
  },
  render: Template,
};

export const Rect: Story = {
  args: {
    variant: "rect",
  },
  render: Template,
};

export const Circle: Story = {
  args: {
    variant: "circle",
  },
  render: Template,
};

export const Rounded: Story = {
  args: {
    variant: "rounded",
  },
  render: Template,
};

export const Color: Story = {
  args: {
    color: "red.500",
  },
  render: Template,
};

export const Card: Story = {
  args: {},
  render: CardTemplate,
};
