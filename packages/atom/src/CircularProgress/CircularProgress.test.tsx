import React from "react";
import { render } from "@testing-library/react";
import CircularProgress from "./CircularProgress";

describe("CircularProgress", () => {
  it("renders", () => {
    const { getByText } = render(<CircularProgress />);
    expect(getByText("CircularProgress")).toBeTruthy();
  });
});
