import { render } from "@testing-library/react";

import React from "react";
import Grid, { GridItem } from "./Grid";

describe("Grid", () => {
  it("should render without crashing", () => {
    const result = render(<Grid></Grid>);
    expect(result).toBeTruthy();
  });
});
