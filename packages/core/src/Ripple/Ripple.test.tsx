import { fireEvent, render } from "@testing-library/react";

import React from "react";
import Ripple from "./Ripple";

describe("Ripple", () => {
  const ref = React.createRef<HTMLButtonElement>();
  ref.current?.setAttribute("data-testid", "ripple-button");

  const RippleTemplete = (isTouch: boolean = false) => (
    <button data-testid="ripple-button">
      Click me
      <Ripple isTouch={isTouch} parentRef={ref} data-testid={"ripple-root"} />
    </button>
  );

  it("should render without crashing", () => {
    const result = render(RippleTemplete());

    expect(result).toBeTruthy();
  });
});
