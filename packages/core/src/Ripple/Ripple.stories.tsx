import type { Meta } from "@storybook/react";

import React from "react";

import Ripple, { RippleProps } from "./Ripple";
import styles from "./Ripple.scss";
import classNames from "classnames";

export default {
  component: Ripple,
  title: "Core/Ripple",
  tags: ["autodocs"],
} satisfies Meta<typeof Ripple>;

const cx = classNames.bind(styles);

const Template = (args: RippleProps) => {
  return <button>button</button>;
};

export const Default = Template.bind({});
Default.args = {
  Ripple: {
    title: "Default Ripple",
    state: "Ripple",
  },
};
