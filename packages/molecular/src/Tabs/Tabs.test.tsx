import { render } from "@testing-library/react";

import React from "react";
import Tabs from "./Tabs";
import Tab from "../Tab";

describe("Tabs", () => {
  it("should render without crashing", () => {
    const result = render(
      <Tabs>
        <Tab></Tab>
      </Tabs>,
    );
    expect(result).toBeTruthy();
  });

  it("should render without animation", () => {
    const result = render(
      <Tabs animation={false}>
        <Tab></Tab>
      </Tabs>,
    );

    const indicator = result.container.querySelector(".YnI-Tabs-Indicator");
    expect(indicator).toBeFalsy();
  });
});
