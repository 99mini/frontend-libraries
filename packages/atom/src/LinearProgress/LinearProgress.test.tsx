import React from "react";
import { render, waitFor } from "@testing-library/react";
import LinearProgress from "./LinearProgress";

describe("LinearProgress", () => {
  it("renders", () => {
    const result = render(<LinearProgress />);
    expect(result).toBeTruthy();
  });

  it("renders buffer", async () => {
    const { container } = render(<LinearProgress varient="buffer" />);
    expect(container.querySelector(".YnI-LinearProgress-Buffer")).toBeTruthy();
  });

  it("renders indeterminate", () => {
    const { container } = render(<LinearProgress varient="indeterminate" />);
    expect(
      container.querySelector(".YnI-LinearProgress-Indeterminate"),
    ).toBeTruthy();
  });
});
