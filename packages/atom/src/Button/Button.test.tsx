import { render } from "@testing-library/react";

import React from "react";
import Button from "./Button";

describe("Button", () => {
  it("should render without crashing", () => {
    const result = render(<Button></Button>);
    expect(result).toBeTruthy();
  });

  it("should render href correctly", () => {
    const result = render(<Button href="https://www.google.com"></Button>);
    const href = result.getByRole("link");
    expect(href).toBeTruthy();
  });
});
