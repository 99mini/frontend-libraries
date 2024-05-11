import type { Meta, StoryObj } from "@storybook/react";

import React, { useRef } from "react";
import Ripple, { RippleProps } from "./Ripple";
import classNames from "classnames/bind";
import styles from "./Ripple.scss";

const meta = {
  component: Ripple,
  title: "Core/Ripple",
  tags: ["autodocs"],
} satisfies Meta<typeof Ripple>;

export default meta;

type Story = StoryObj<typeof Ripple>;

const cx = classNames.bind(styles);

const Template = (args: RippleProps) => {
  const ref = useRef(null);
  return (
    <button style={{ position: "relative" }} ref={ref}>
      <Ripple parentRef={ref} />
      <span>hello</span>
    </button>
  );
};

export const Default = Template.bind({});
