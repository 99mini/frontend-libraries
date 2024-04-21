import React from "react";

import Ripple, { RippleProps } from "./Ripple";
import styles from "./Ripple.scss";
import button_styles from "../../atom/Button/Button.scss";
import classNames from "classnames";

import Button from "@atom/Button";

export default {
  component: Ripple,
  title: "Ripple",
};

const cx = classNames.bind(styles);
const button_cx = classNames.bind(button_styles);

const Template = (args: RippleProps) => {
  return <Button>button</Button>;
};

export const Default = Template.bind({});
Default.args = {
  Ripple: {
    title: "Default Ripple",
    state: "Ripple",
  },
};
