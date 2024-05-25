import { render } from "@testing-library/react";

import React from "react";
import Badge from "./Badge";

describe("Badge", () => {
  it("should render without crashing", () => {
    const result = render(<Badge></Badge>);
    expect(result).toBeTruthy();
  });
});
