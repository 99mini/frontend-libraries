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

  it("renders with color", () => {
    const result = render(
      <LinearProgress color="red" data-testid="test-linear-progress" />,
    );
    const container = result.getByTestId("test-linear-progress");

    const style = getComputedStyle(container);
    expect(style.getPropertyValue("--linear-progress-color")).toBe("red");
  });

  it("renders with label", () => {
    const result = render(
      <LinearProgress
        label="test-label"
        showLabel
        data-testid="test-linear-progress"
      />,
    );
    const container = result.getByTestId("test-linear-progress");

    expect(container.querySelector(".YnI-Progress-Label")?.textContent).toBe(
      "test-label",
    );
  });

  it("renders with showLabel: determinate", () => {
    const result = render(
      <LinearProgress
        showLabel
        data-testid="test-linear-progress"
        varient="determinate"
      />,
    );
    const container = result.getByTestId("test-linear-progress");

    expect(container.querySelector(".YnI-Progress-Label")).toBeTruthy();
  });

  it("renders with showLabel: buffer", () => {
    const result = render(
      <LinearProgress
        showLabel
        data-testid="test-linear-progress"
        varient="buffer"
      />,
    );
    const container = result.getByTestId("test-linear-progress");

    expect(container.querySelector(".YnI-Progress-Label")).toBeTruthy();
  });
});
