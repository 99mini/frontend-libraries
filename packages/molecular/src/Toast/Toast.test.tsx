import { render } from "@testing-library/react";

import React from "react";
import Toast from "./Toast";

describe("Toast", () => {
  it("should render without crashing", () => {
    const result = render(<Toast open onClose={() => {}}></Toast>);
    expect(result).toBeTruthy();
  });

  it("should render all icon", () => {
    const successIconResult = render(
      <Toast open onClose={() => {}} type="success"></Toast>,
    );

    const infoIconResult = render(
      <Toast open onClose={() => {}} type="info"></Toast>,
    );

    const errorIconResult = render(
      <Toast open onClose={() => {}} type="error"></Toast>,
    );

    const warningIconResult = render(
      <Toast open onClose={() => {}} type="warning"></Toast>,
    );

    const defaultIconResult = render(
      <Toast open onClose={() => {}} type="default"></Toast>,
    );

    const undefinedIconResult = render(
      <Toast open onClose={() => {}} type={undefined}></Toast>,
    );

    expect(
      successIconResult.container.querySelector(".YnI-Toast-icon"),
    ).toBeTruthy();
    expect(
      infoIconResult.container.querySelector(".YnI-Toast-icon"),
    ).toBeTruthy();
    expect(
      errorIconResult.container.querySelector(".YnI-Toast-icon"),
    ).toBeTruthy();
    expect(
      warningIconResult.container.querySelector(".YnI-Toast-icon"),
    ).toBeTruthy();
    expect(
      defaultIconResult.container.querySelector(".YnI-Toast-icon"),
    ).toBeFalsy();
    expect(
      undefinedIconResult.container.querySelector(".YnI-Toast-icon"),
    ).toBeFalsy();
  });

  it("should call onClose when animation is done", async () => {
    const onClose = jest.fn();
    const result = render(
      <Toast open onClose={onClose} duration={100}></Toast>,
    );
    expect(result).toBeTruthy();
    await new Promise((_) => setTimeout(_, 200));
    expect(onClose).toBeCalled();
  });
});
