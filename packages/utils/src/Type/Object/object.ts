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
 *  const value = obj[key];
 *  console.log(value); //=> "value"
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
 * obj[keys[0]]; //=> "value"
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
