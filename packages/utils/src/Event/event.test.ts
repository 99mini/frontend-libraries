import { describe, expect, test } from "@jest/globals";

import { isMouseEvent, isTouchEvent } from "./event";

describe("isMouseEvent", () => {
  test("should return true for MouseEvent", () => {
    const event = new MouseEvent("click");
    expect(isMouseEvent(event)).toBe(true);
  });

  test("should return false for TouchEvent", () => {
    const event = new TouchEvent("touchstart");
    expect(isMouseEvent(event)).toBe(false);
  });
});

describe("isTouchEvent", () => {
  test("should return true for TouchEvent", () => {
    const event = new TouchEvent("touchstart");
    expect(isTouchEvent(event)).toBe(true);
  });

  test("should return false for MouseEvent", () => {
    const event = new MouseEvent("click");
    expect(isTouchEvent(event)).toBe(false);
  });
});
