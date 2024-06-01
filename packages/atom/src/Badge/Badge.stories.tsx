import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import Badge, { BadgeProps } from "./Badge";

export default {
  component: Badge,
  title: "atom/Badge",
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

const DefaultTemplate = (args: BadgeProps) => (
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
      {"I"}
    </div>
  </Badge>
);

const MaxTemplate = (args: BadgeProps) => {
  const [max, setMax] = React.useState(args.max);
  const [badgeContent, setBadgeContent] = React.useState(args.badgeContent);
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <DefaultTemplate />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <DefaultTemplate max={9} badgeContent={10} />
        <div>
          <div>
            <span>max: </span>
            <span>9</span>
          </div>
          <div>
            <span>badgeContnet: </span>
            <span>10</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <DefaultTemplate max={99} badgeContent={100} />
        <div>
          <div>
            <span>max: </span>
            <span>99</span>
          </div>
          <div>
            <span>badgeContnet: </span>
            <span>100</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <DefaultTemplate max={999} badgeContent={1000} />
        <div>
          <div>
            <span>max: </span>
            <span>999</span>
          </div>
          <div>
            <span>badgeContnet: </span>
            <span>1000</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <DefaultTemplate {...args} max={max} badgeContent={badgeContent} />
        <div>
          <div>
            <span>max: </span>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
          </div>
          <div>
            <span>badgeContnet: </span>
            <input
              type="number"
              value={badgeContent}
              onChange={(e) => setBadgeContent(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PositionTemplate = (args: BadgeProps) => {
  const [position, setPosition] = React.useState<{
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
  }>(args.position || { vertical: "top", horizontal: "right" });

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, id } = e.target;
    setPosition((prev) => ({ ...prev, [name]: id }));
  };

  return (
    <div>
      <DefaultTemplate position={position} {...args} />
      <form
        style={{
          display: "flex",
          gap: 16,
        }}
      >
        <div>
          <h3>vertical</h3>
          <label htmlFor="top">
            <div>top</div>
            <input
              type="radio"
              name="vertical"
              id="top"
              checked={position?.vertical === "top"}
              onChange={handleRadioChange}
            />
          </label>
          <label htmlFor="bottom">
            <div>bottom</div>
            <input
              type="radio"
              name="vertical"
              id="bottom"
              checked={position?.vertical === "bottom"}
              onChange={handleRadioChange}
            />
          </label>
        </div>
        <div>
          <h3>horizontal</h3>
          <label htmlFor="left">
            <div>left</div>
            <input
              type="radio"
              name="horizontal"
              id="left"
              checked={position?.horizontal === "left"}
              onChange={handleRadioChange}
            />
          </label>
          <label htmlFor="right">
            <div>right</div>
            <input
              type="radio"
              name="horizontal"
              id="right"
              checked={position?.horizontal === "right"}
              onChange={handleRadioChange}
            />
          </label>
        </div>
      </form>
    </div>
  );
};

const DotTemplate = (args: BadgeProps) => {
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <DefaultTemplate badgeContent={10} />
      <DefaultTemplate {...args} />
    </div>
  );
};
export const Default: Story = {
  render: DefaultTemplate,
};
export const Content: Story = {
  render: DefaultTemplate,
  args: {
    badgeContent: 1,
  },
};

export const Max: Story = {
  render: MaxTemplate,
  args: {
    badgeContent: 100,
    max: 99,
  },
};

export const Color: Story = {
  render: DefaultTemplate,
  args: {
    badgeContent: 1,
    color: "blue",
  },
};

export const Position: Story = {
  render: PositionTemplate,
  args: {
    badgeContent: 1,
  },
};

export const Dot: Story = {
  render: DotTemplate,
  args: {
    badgeContent: undefined,
  },
};
