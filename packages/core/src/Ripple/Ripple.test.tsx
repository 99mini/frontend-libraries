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

  // click ripple-button, Node Child is exist in parent with className animate
  it("should render without crashing with mouse event", () => {
    const result = render(RippleTemplete());

    fireEvent.click(result.getByTestId("ripple-button"));

    expect(result.getByTestId("ripple-root").childNodes.length).toBe(1);
  });

  it("should render without crashing with touch event", () => {
    const result = render(RippleTemplete(true));

    expect(result).toBeTruthy();
  });
});
