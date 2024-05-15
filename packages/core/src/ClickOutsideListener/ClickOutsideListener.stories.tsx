import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import ClickOutsideListener, {
  ClickOutsideListenerProps,
} from "./ClickOutsideListener";

const meta = {
  component: ClickOutsideListener,
  title: "core/ClickOutsideListener",
  tags: ["autodocs"],
} satisfies Meta<typeof ClickOutsideListener>;

export default meta;

type Story = StoryObj<typeof ClickOutsideListener>;

const Modal = () => {
  return (
    <div
      role="modal"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        padding: 8,
        backgroundColor: "white",
      }}
    >
      <header>modal</header>
      <p>modal content</p>
      <footer>modal footer</footer>
    </div>
  );
};

const Template = (args: ClickOutsideListenerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>open modal</button>
      {isOpen && (
        <ClickOutsideListener onClickOutside={() => setIsOpen(false)}>
          <Modal />
        </ClickOutsideListener>
      )}
    </div>
  );
};

export const Default = Template.bind({});
