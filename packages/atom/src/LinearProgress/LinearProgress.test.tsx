import React from "react";
import { render } from "@testing-library/react";
import LinearProgress from "./LinearProgress";

describe("LinearProgress", () => {
  it("renders", () => {
    const { getByText } = render(<LinearProgress />);
    expect(getByText("LinearProgress")).toBeTruthy();
  });
});
