import React from "react";

import Button, { ButtonProps } from "./Button";
import styles from "./Button.scss";
import classNames from "classnames";

export default {
  component: Button,
  title: "Button",
};

const cx = classNames.bind(styles);

const Template = (args: ButtonProps) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  Button: {
    title: "Default Button",
    state: "Button_INBOX",
  },
};

export const AnchorButton = Template.bind({});
AnchorButton.args = {
  Button: {
    ...Default.args.Button,
    state: "Button_AnchorButton",
  },
  href: "/",
};
