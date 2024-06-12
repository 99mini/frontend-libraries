import React from "react";
import { render } from "@testing-library/react";
import CircularProgress from "./CircularProgress";

describe("CircularProgress", () => {
  it("renders", () => {
    const result = render(
      <CircularProgress data-testid="test-circular-progress" />,
    );
    const container = result.getByTestId("test-circular-progress");
    const style = getComputedStyle(container);

    expect(style.getPropertyValue("--circular-progress-size")).toBe("40px");

    expect(result).toBeTruthy();
  });
});
