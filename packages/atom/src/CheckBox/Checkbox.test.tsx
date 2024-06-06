import { render } from "@testing-library/react";

import React from "react";
import CheckBox from "./CheckBox";

describe("CheckBox", () => {
  it("should render without crashing", () => {
    const result = render(<CheckBox></CheckBox>);
    expect(result).toBeTruthy();
  });

  it("should render label correctly", () => {
    const result = render(<CheckBox label="test" />);
    const label = result.getByText("test");
    expect(label).toBeTruthy();
  });
});
