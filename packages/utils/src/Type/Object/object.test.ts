import { describe, expect, test } from "@jest/globals";

import { inferedObjectKeys, isObjectKey, omit, pick } from "./object";

describe("isObjectKey", () => {
  const obj = { key: "value" } as const;

  test("should return true if key is a key of obj", () => {
    let key = "key";
    if (isObjectKey(obj, key)) {
      const value = obj[key];
      expect(value === obj.key).toBeTruthy();
    }
  });
});

describe("inferObjectKeys", () => {
  const obj = { key: "value" } as const;

  test("should return an array of keys of obj", () => {
    let keys = inferedObjectKeys(obj);
    obj[keys[0]];

    expect(keys).toEqual(["key"]);
  });

  test("should return an empty array if obj is an empty object", () => {
    type EmptyObjType = {};
    const emptyObj: EmptyObjType = {};
    let keys = inferedObjectKeys(emptyObj);

    expect(keys).toEqual([]);
  });
});

describe("omit", () => {
  const obj = { a: 1, b: 2, c: 3 } as const;

  test("should omit the key from the object", () => {
    const result = omit(obj, ["a"]);
    expect(result).toHaveProperty("b");
    expect(result).not.toHaveProperty("a");
  });
});

describe("pick", () => {
  const obj = { a: 1, b: 2, c: 3 } as const;

  test("should pick the key from the object", () => {
    const result = pick(obj, ["a"]);
    expect(result).toHaveProperty("a");
    expect(result).not.toHaveProperty("b");
    expect(result).not.toHaveProperty("c");
  });
});
