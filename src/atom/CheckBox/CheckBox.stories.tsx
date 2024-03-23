
import React from "react";

import CheckBox, { CheckBoxProps } from "./CheckBox";
import styles from "./CheckBox.scss";
import classNames from "classnames";

export default {
  component: CheckBox,
  title: "CheckBox",
};

const cx = classNames.bind(styles);

const Template = (args: CheckBoxProps) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  CheckBox: {
    title: "Default CheckBox",
    state: "CheckBox",
  },
};
