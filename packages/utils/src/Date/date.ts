/**
 * @description month index 1 ~ 12
 */
export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type MonthType = (typeof MONTHS)[number];

/**
 * @description weekday index 0 ~ 6
 */
export const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6] as const;
export type WeekdayType = (typeof WEEKDAYS)[number];

/**
 * @description month name english
 */
export const MONTHS_ENG = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type MonthNameEngType = (typeof MONTHS_ENG)[number];

/**
 * @description month name korean
 */
export const WEEKDAYS_ENG = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;
export type WeekdayNameEngType = (typeof WEEKDAYS_ENG)[number];

/**
 * @description weekday name Korean
 */
export const WEEKDAYS_KOR = ["일", "월", "화", "수", "목", "금", "토"] as const;

export type WeekdayNameKorType = (typeof WEEKDAYS_KOR)[number];

export type LocaleType = "en" | "kor";

/**
 * @description is leap year
 * @param year
 * @returns
 */
export const isLeapYear = (year: number): boolean => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

/**
 * @description end of year month
 * @param date - Date
 * @returns end of year month
 * @example
 */
export const endOfDay = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * @description get month name
 * @param month
 * @param locale default "kor"
 * @returns
 */
export const getMonthName = (month: MonthType, locale: LocaleType = "kor") => {
  return locale === "kor" ? `${month}월` : MONTHS_ENG[month - 1];
};

/**
 * @description get weekday index 0 ~ 6
 * @param year
 * @param month
 * @returns
 */
export const getWeekdayIndex = (date: Date): WeekdayType => {
  return date.getDay() as WeekdayType;
};

/**
 * @description get weekday name
 * @param weekday
 * @param locale default "kor"
 * @returns
 */
export const getWeekdayName = (
  weekday: WeekdayType,
  locale: LocaleType = "kor",
) => {
  return locale === "kor" ? WEEKDAYS_KOR[weekday] : WEEKDAYS_ENG[weekday];
};

/**
 * @description get diff days
 * @param date1
 * @param date2
 * @returns
 */
export const diffDays = (date1: Date, date2: Date): number => {
  const diff = date2.getTime() - date1.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

/**
 * @description add days
 * @param date
 * @param days
 * @returns
 */
export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};

/**
 * @description get alias before time
 * @example
 * ```typescript
 * aliasBeforeDate(new Date(2024, 5, 12, 2, 59, 30), new Date(2024, 5, 12, 3)) // "방금 전"
 * aliasBeforeDate(new Date(2024, 5, 12, 2, 30), new Date(2024, 5, 12, 3)) // "30분 전"
 * aliasBeforeDate(new Date(2024, 5, 12, 12), new Date(2024, 5, 13, 13)) // "1시간 전"
 * aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 5, 13)) // "1일 전"
 * aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 5, 14)) // "2일 전"
 * aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 6, 14)) // "1달 전"
 * aliasBeforeDate(new Date(2024, 5, 12), new Date(2025, 6, 14)) // "1년 전"
 * ```
 * @param year
 * @returns
 */
export const aliasBeforeDate = (
  before: Date,
  current: Date,
  locale: LocaleType = "kor",
): string => {
  const isKor = locale === "kor";

  const aliasEng = (unit: string, count: number) =>
    `${unit}${count > 1 ? "s" : ""} ago`;

  const diff = diffDays(before, current);

  if (diff >= 365) {
    const year = Math.floor(diff / 365);
    return `${year}${isKor ? "년 전" : aliasEng("year", year)}`;
  }

  if (diff < 365 && diff >= 30) {
    const month = Math.floor(diff / 30);
    return `${month}${isKor ? "달 전" : aliasEng("month", month)}`;
  }

  if (diff < 30 && diff >= 1) {
    const day = Math.floor(diff);
    return `${day}${isKor ? "일 전" : aliasEng("day", day)}`;
  }

  const minute = Math.floor((current.getTime() - before.getTime()) / 1000 / 60);

  if (minute >= 60) {
    const hour = Math.floor(minute / 60);
    return `${hour}${isKor ? "시간 전" : aliasEng("hour", hour)}`;
  }

  if (minute >= 1) {
    return `${minute}${isKor ? "분 전" : aliasEng("minute", minute)}`;
  }

  return isKor ? "방금 전" : "just now";
};

/**
 * @description compare date
 * @param date1
 * @param date2
 * @returns Returns 1 if date1 is greater than date2, -1 if date1 is less than date2, and 0 if date1 is equal to date2.
 */
export const compareDate = (date1: Date, date2: Date) => {
  if (date1 > date2) {
    return 1;
  }
  if (date1 < date2) {
    return -1;
  }
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  ) {
    return 0;
  }

  throw new Error("Invalid Date");
};
