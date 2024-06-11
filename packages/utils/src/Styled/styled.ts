/**
 * @description
 *  - Formats the value with the unit.
 *  - If the value is of string type and not a number, it will return the value as it is.
 *  - If the value is of numeric type, it will append the unit to the value.
 *  - IF the unit is not provided, it will append `px` as the default unit.
 *
 * @param value - The value to be formatted.
 * @param unit  - The unit to be appended to the value. Default is `px`.
 * @returns The formatted value with unit.
 */
export const formatUnit = (
  value: number | string,
  unit: string = "px",
): string => {
  if (typeof value === "string" && String(Number(value)) === "NaN") {
    return value;
  }
  return `${value}${unit}`;
};

export const styled = {
  formatUnit,
};

export default styled;
