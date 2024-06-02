import { fireEvent, render, waitFor } from "@testing-library/react";

import React from "react";
import ClickOutsideListener from "./ClickOutsideListener";

describe("ClickOutsideListener", () => {
  it("should render without crashing", () => {
    const result = render(
      <ClickOutsideListener
        onClickOutside={() => {}}
        data-testid="click-outside-listener"
      >
        <div>inner</div>
      </ClickOutsideListener>,
    );
    expect(result.getByText("inner")).toBeTruthy();
  });

  it("should not call onClickOutside when clicked inside", () => {
    const onClickOutside = jest.fn();
    const result = render(
      <ClickOutsideListener onClickOutside={onClickOutside}>
        <div>inner</div>
      </ClickOutsideListener>,
    );

    const inner = result.getByText("inner");

    fireEvent.click(inner);

    expect(onClickOutside).not.toBeCalled();
  });

  it("should call onClickOutside when clicked outside", async () => {
    const onClickOutside = jest.fn();
    const result = render(
      <div>
        <div data-testid="outside">outside</div>
        <ClickOutsideListener onClickOutside={onClickOutside}>
          <div>inner</div>
        </ClickOutsideListener>
      </div>,
    );

    await waitFor(() => {
      const outside = result.getByTestId("outside");
      fireEvent.click(outside);
      expect(onClickOutside).toBeCalled();
    });
  });
});
