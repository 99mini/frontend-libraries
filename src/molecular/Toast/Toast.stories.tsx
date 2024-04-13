import React from "react";

import Toast, { ToastProps } from "./Toast";
import styles from "./Toast.scss";
import classNames from "classnames";

import Button from "@atom/Button";

export default {
  component: Toast,
  title: "Toast",
};

const cx = classNames.bind(styles);

const Template = (args: ToastProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20 }}>
      <div style={{ height: 400, width: "100%", backgroundColor: "plum" }}>{"some contents"}</div>

      <Button onClick={() => setOpen(true)}>toast fire</Button>
      <Toast {...args} open={open} onClose={() => setOpen(false)} style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{"children message"}</span>
        <Button style={{ color: "blue" }} onClick={() => setOpen(false)}>
          {"확인"}
        </Button>
      </Toast>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  Toast: {
    title: "Default Toast",
    state: "Toast",
  },
};
