import { render } from "@testing-library/react";

import React from "react";
import Toast from "./Toast";

describe("Toast", () => {
  it("should render without crashing", () => {
    const result = render(<Toast open onClose={() => {}}></Toast>);
    expect(result).toBeTruthy();
  });
});
