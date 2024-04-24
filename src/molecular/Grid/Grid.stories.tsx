import type { Meta } from "@storybook/react";

import React from "react";

import Grid, { GridProps } from "./Grid";
import styles from "./Grid.scss";
import classNames from "classnames";

export default {
  component: Grid,
  title: "molecular/Grid",
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

const cx = classNames.bind(styles);

const Template = (args: GridProps) => <Grid {...args} />;

export const Default = Template.bind({});
