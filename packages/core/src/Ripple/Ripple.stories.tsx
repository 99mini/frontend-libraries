import type { Meta, StoryObj } from "@storybook/react";

import React, { useRef } from "react";
import Ripple from "./Ripple";

const meta = {
  component: Ripple,
  title: "Core/Ripple",
  tags: ["autodocs"],
} satisfies Meta<typeof Ripple>;

export default meta;

type Story = StoryObj<typeof Ripple>;

const Template = () => {
  const ref = useRef(null);
  return (
    <button style={{ position: "relative" }} ref={ref}>
      <Ripple parentRef={ref} />
      <span>hello</span>
    </button>
  );
};

export const Default: Story = {
  render: Template,
};
