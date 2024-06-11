import { describe, expect, test } from "@jest/globals";

import styled from "./styled";

describe("Styled", () => {
  describe("formatUnit", () => {
    test("should return value of numeric type with unit", () => {
      expect(styled.formatUnit(10, "px")).toBe("10px");
    });

    test("should return value of string type with unit", () => {
      expect(styled.formatUnit("10", "px")).toBe("10px");
    });

    test("should return value without unit", () => {
      expect(styled.formatUnit("10px", "rem")).toBe("10px");
    });

    test("should return value without unit", () => {
      expect(styled.formatUnit(10)).toBe("10px");
    });
  });
});
