import { render } from "@testing-library/react";

import React from "react";
import SingleCalendar from "./SingleCalendar";

describe("SingleCalendar", () => {
  it("should render without crashing", () => {
    const result = render(<SingleCalendar />);
    expect(result).toBeTruthy();
  });
});
