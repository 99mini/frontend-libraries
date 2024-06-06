import { fireEvent, render, waitFor } from "@testing-library/react";

import React from "react";
import Tab from "./Tab";
import Tabs from "../Tabs";

describe("Tab", () => {
  it("should fire click event", async () => {
    const result = render(
      <Tabs>
        <Tab data-testid={"tab"}>1</Tab>
        <Tab data-testid={"tab"}>2</Tab>
        <Tab data-testid={"tab"}>3</Tab>
      </Tabs>,
    );
    expect(result).toBeTruthy();

    const allTabList = result.getAllByTestId("tab");

    await waitFor(() => {
      const firstTab = allTabList.find((tab) => tab.textContent === "1")!;

      fireEvent.click(firstTab.firstChild!);
      expect(firstTab.className.includes("active")).toBeTruthy();
    });

    await waitFor(() => {
      const firstTab = allTabList.find((tab) => tab.textContent === "1")!;
      const secondTab = allTabList.find((tab) => tab.textContent === "2")!;

      fireEvent.click(secondTab.firstChild!);

      expect(firstTab.className.includes("active")).toBeFalsy();
      expect(secondTab.className.includes("active")).toBeTruthy();
    });
  });
});
