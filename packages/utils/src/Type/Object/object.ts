/**
 * Checks if a given key exists in an object.
 * @param object - The object to check.
 * @param key - The key to check for existence.
 * @returns A boolean indicating whether the key exists in the object.
 * @example
 * **valid typescript code**
 * ```ts
 * const obj = { key: "value" } as const;
 * let key = "key";
 * if (isObjectKey(obj, key)) {
 *  const value = obj[key]; // "value"
 * }
 * ```
 *
 * **invalid typescript code**
 * ```ts
 * let key = "key";
 * const value = obj[key]; // Error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ key: "value"; }'.
 * ```
 */
export const isObjectKey = <T extends Object>(
  object: T,
  key: string | number | symbol,
): key is keyof T => {
  return key in object;
};

/**
 * Infers and returns the keys of an object.
 * @param object - The object to infer keys from.
 * @returns An array of keys of the object.
 * @example
 * **valid typescript code**
 * ```ts
 * const obj = { key: "value" } as const;
 * let keys = inferedObjectKeys(obj);
 * obj[keys[0]]; // "value"
 * ```
 *
 * **invalid typescript code**
 * ```ts
 * const obj = { key: "value" } as const;
 * let keys = Object.keys(obj);
 * obj[keys[0]]; // Error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ key: "value"; }'.
 * ```
 */
export const inferedObjectKeys = <T extends Object>(object: T): (keyof T)[] => {
  return Object.keys(object) as (keyof T)[];
};

/**
 * Omit a key from an object.
 * @param object - The object to omit the key from.
 * @param keys - The keys to omit from the object.
 * @returns A new object with the key omitted.
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 } as const;
 * const result = omit(obj, ["a"]); // { b: 2, c: 3 }
 * ```
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...object };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

/**
 * Pick a key from an object.
 * @param object - The object to pick the key from.
 * @param keys - The keys to pick from the object.
 * @returns A new object with the key picked.
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 } as const;
 * const result = pick(obj, ["a"]); // { a: 1 }
 * ```
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[],
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = object[key];
  });
  return result;
};
