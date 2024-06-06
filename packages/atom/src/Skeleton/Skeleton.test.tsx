import { render } from "@testing-library/react";
import React from "react";

import Skeleton from "./Skeleton";

describe("Skeleton", () => {
  it("should render correctly", () => {
    const { container } = render(<Skeleton />);
    expect(container).toBeTruthy();
  });

  it("should render with color", async () => {
    const result = render(<Skeleton color="red" data-testid="test-skeleton" />);

    const renderSkeleton = result.getByTestId("test-skeleton");

    const style = getComputedStyle(renderSkeleton);
    expect(style.getPropertyValue("--skeleton-color")).toBe("red");
  });
});
