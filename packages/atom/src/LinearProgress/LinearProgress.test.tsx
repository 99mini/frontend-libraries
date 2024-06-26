import React from "react";

import { render } from "@testing-library/react";

import LinearProgress from "./LinearProgress";

describe("LinearProgress", () => {
  it("renders", () => {
    const result = render(
      <LinearProgress data-testid="test-linear-progress" />,
    );

    const container = result.getByTestId("test-linear-progress");
    const style = getComputedStyle(container);

    expect(style.getPropertyValue("--linear-progress-height")).toBe("4px");

    expect(result).toBeTruthy();
  });

  it("renders buffer", async () => {
    const { container } = render(<LinearProgress varient="buffer" />);
    expect(container.querySelector(".YnI-LinearProgress-buffer")).toBeTruthy();
  });

  it("renders indeterminate", () => {
    const { container } = render(<LinearProgress varient="indeterminate" />);
    expect(
      container.querySelector(".YnI-LinearProgress-indeterminate"),
    ).toBeTruthy();
  });

  it("renders with hegiht", () => {
    const result = render(
      <LinearProgress height={10} data-testid="test-linear-progress" />,
    );
    const container = result.getByTestId("test-linear-progress");

    const style = getComputedStyle(container);
    expect(style.getPropertyValue("--linear-progress-height")).toBe("10px");
  });
});
