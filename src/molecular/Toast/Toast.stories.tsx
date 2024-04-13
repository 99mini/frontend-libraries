
import React from "react";

import Toast, { ToastProps } from "./Toast";
import styles from "./Toast.scss";
import classNames from "classnames";

export default {
  component: Toast,
  title: "Toast",
};

const cx = classNames.bind(styles);

const Template = (args: ToastProps) => <Toast {...args} />;

export const Default = Template.bind({});
Default.args = {
  Toast: {
    title: "Default Toast",
    state: "Toast",
  },
};
