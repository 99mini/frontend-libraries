import { render } from "@testing-library/react";

import React from "react";
import ClickOutsideListener from "./ClickOutsideListener";

describe("ClickOutsideListener", () => {
  it("should render without crashing", () => {
    const result = render(
      <ClickOutsideListener onClickOutside={() => {}}>
        <div></div>
      </ClickOutsideListener>,
    );
    expect(result).toBeTruthy();
  });
});
