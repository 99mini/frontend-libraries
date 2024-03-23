
import React from "react";

import Textarea, { TextareaProps } from "./Textarea";
import styles from "./Textarea.scss";
import classNames from "classnames";

export default {
  component: Textarea,
  title: "Textarea",
};

const cx = classNames.bind(styles);

const Template = (args: TextareaProps) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  Textarea: {
    title: "Default Textarea",
    state: "Textarea",
  },
};
