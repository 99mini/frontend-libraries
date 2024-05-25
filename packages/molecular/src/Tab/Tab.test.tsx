import { render } from "@testing-library/react";

import React from "react";
import Tab, { Tabs } from "./Tab";

describe("Tabs", () => {
  it("should render without crashing", () => {
    const result = render(<Tabs></Tabs>);
    expect(result).toBeTruthy();
  });
});

describe("Tab", () => {
  it("should render without crashing", () => {
    const result = render(<Tab></Tab>);
    expect(result).toBeTruthy();
  });
});
