import { render } from "@testing-library/react";

import React from "react";
import Button from "./Button";

describe("Button", () => {
  it("should render without crashing", () => {
    const result = render(<Button></Button>);
    expect(result).toBeTruthy();
  });
});
