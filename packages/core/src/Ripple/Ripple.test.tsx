import { render } from "@testing-library/react";

import React from "react";
import Ripple from "./Ripple";

describe("Ripple", () => {
  it("should render without crashing", () => {
    const elem = document.createElement("div");
    const ref = { current: elem };

    const result = render(<Ripple parentRef={ref} />);
    expect(result).toBeTruthy();
  });
});
