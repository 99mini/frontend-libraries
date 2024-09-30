import React from "react";
import { render } from "@testing-library/react";
import TextField from "./TextField";

describe("TextField", () => {
  it("renders", () => {
    const { container } = render(<TextField />);
    const inputElement = container.querySelector(
      ".YnI-TextField-Root > input.YnI-TextField[type='text']",
    );
    expect(inputElement).toBeTruthy();
  });

  it("renders textarea", () => {
    const { container } = render(<TextField muiltiline />);
    const textareaElement = container.querySelector(
      ".YnI-TextField-Root > textarea.YnI-TextField.YnI-TextField-Multi",
    );
    expect(textareaElement).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(<TextField className="custom-class" />);
    const rootElement = container.querySelector(
      ".YnI-TextField-Root.custom-class",
    );
    expect(rootElement).toBeTruthy();
  });
});
