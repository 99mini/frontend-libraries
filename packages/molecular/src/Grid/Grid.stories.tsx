import type { Meta, StoryObj } from "@storybook/react";

import React, { CSSProperties } from "react";

import Grid from "./Grid";
import GridItem from "../GridItem";

const meta = {
  component: Grid,
  title: "molecular/Grid",
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof Grid>;

/**
 *
 * @description generate random width(range: 200px ~ 600px), height(range:300px ~ 500px)
 */
const Box = () => {
  const style: CSSProperties = {
    height: Math.floor(Math.random() * 200) + 300,
    backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,

    borderRadius: "10px",
    border: `1px solid #000000`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div style={style}>
      {Object.entries(style).map(([key, value], i) => (
        <div key={i}>{`${key}: ${value}`}</div>
      ))}
    </div>
  );
};

const Template = ({ ...args }) => (
  <div>
    <h1>Grid</h1>
    <div style={{ padding: "0 16px", margin: "0 auto" }}>
      <Grid {...args}>
        {Array.from({ length: 10 }, (_, i) => (
          <GridItem key={i}>
            <Box />
          </GridItem>
        ))}
      </Grid>
    </div>
  </div>
);

/**
 * Grid component is a layout component that arranges child components in a grid layout.
 */
export const Default: Story = {
  args: {
    regular: true,
  },
  render: Template,
};

/**
 * Grid component is a layout component that arranges child components in a grid layout.
 */
export const Regular: Story = {
  args: {
    regular: true,
  },
  render: Template,
};

/**
 * Grid component is a layout component that arranges child components in a irregular grid layout.
 */
export const Irregular: Story = {
  args: {
    regular: false,
  },
  render: Template,
};
