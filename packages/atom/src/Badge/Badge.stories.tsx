import type { Meta } from "@storybook/react";

import React from "react";

import Badge, { BadgeProps } from "./Badge";
import styles from "./Badge.scss";
import classNames from "classnames";

export default {
  component: Badge,
  title: "atom/Badge",
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

const cx = classNames.bind(styles);

const Template = (args: BadgeProps) => (
  <Badge {...args}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 24,
        backgroundColor: "gray",
        borderRadius: 4,
      }}
    >
      I
    </div>
  </Badge>
);

export const Default = Template.bind({});
