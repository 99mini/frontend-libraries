import { render } from "@testing-library/react";

import React from "react";
import Badge from "./Badge";

describe("Badge", () => {
  it("should render without crashing", () => {
    const result = render(<Badge></Badge>);
    expect(result).toBeTruthy();
  });

  it("should render with badgeContent", () => {
    const result = render(<Badge badgeContent={1}></Badge>);
    const badgeContent = result.getByText("1");
    expect(badgeContent).toBeTruthy();
  });

  it("should render with max", () => {
    const result = render(<Badge badgeContent={10} max={5}></Badge>);
    const badgeContent = result.getByText("5");
    expect(badgeContent).toBeTruthy();
  });

  it("should render with badgeContent and max", () => {
    const result = render(<Badge badgeContent={10} max={5}></Badge>);
    const badgeContent = result.getByText("5");
    expect(badgeContent).toBeTruthy();
  });
});
