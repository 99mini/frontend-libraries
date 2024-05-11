import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import Toast, { ToastProps } from "./Toast";
import classNames from "classnames/bind";
import styles from "./Toast.scss";

const meta = {
  component: Toast,
  title: "molecular/Toast",
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

const cx = classNames.bind(styles);

const Template = (args: ToastProps) => {
  const [openBasic, setOpenBasic] = React.useState(false);
  const [openCustom, setOpenCustom] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div style={{ height: 200, width: "100%", backgroundColor: "plum" }}>
        {"some contents"}
      </div>

      <button onClick={() => setOpenBasic(true)}>basic toast</button>
      <button onClick={() => setOpenCustom(true)}>custom toast</button>
      <Toast
        {...args}
        open={openBasic}
        onClose={() => setOpenBasic(false)}
        message="message"
      ></Toast>
      <Toast {...args} open={openCustom} onClose={() => setOpenCustom(false)}>
        <div style={{ display: "flex", gap: "8px", alignContent: "center" }}>
          <span>icon area</span>
          <span>message aree</span>
          <button
            style={{ color: "white" }}
            onClick={() => setOpenCustom(false)}
          >
            확인
          </button>
        </div>
      </Toast>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  toast: {
    message: "message",
    duration: 3000,
    type: "default",
  },
};
