import React from "react";

import Ripple, { RippleProps } from "./Ripple";
import styles from "./Ripple.scss";
import classNames from "classnames";

import Button from "@atom/Button";

export default {
  component: Ripple,
  title: "Ripple",
};

const cx = classNames.bind(styles);

const Template = (args: RippleProps) => {
  return (
    <Button>
      <Ripple {...args} />
      <span>button</span>
    </Button>
  );
};

export const Default = Template.bind({});
Default.args = {
  Ripple: {
    title: "Default Ripple",
    state: "Ripple",
  },
};
