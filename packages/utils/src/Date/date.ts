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

/**
 * @description get end of number of days in the month
 * @override endOfYaerMonth: (date: Date) => number
 * @param year
 * @param month
 * @returns {number} end of number of days in the month
 */

export const endOfYaerMonth = (year: number, month: MonthType): number => {
  if (month === 2) {
    return year % 4 === 0 ? 29 : 28;
  }

  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

/**
 * @description get month name English
 * @param month
 * @returns
 */
export const getMonthNameEng = (month: MonthType) => {
  return MONTHS_ENG[month - 1];
};

/**
 * @description get month name Korean
 * @param month
 * @returns
 */
export const getMonthNameKor = (month: MonthType) => {
  return `${month}월`;
};

/**
 * @description get weekday index 0 ~ 6
 * @param year
 * @param month
 * @returns
 */
export const getWeekdayIndex = (
  year: number,
  month: MonthType,
  day: number,
): WeekdayType => {
  const date = new Date(year, month - 1, day);

  if (!date) {
    throw new Error("Invalid date");
  }

  const index = date.getDay();

  return index as WeekdayType;
};

/**
 * @description get weekday name English
 * @param weekday
 * @returns
 */
export const getWeekdayNameEng = (weekday: WeekdayType) => {
  return WEEKDAYS_ENG[weekday];
};

/**
 * @description get weekday name Korean
 * @param weekday
 * @returns
 */
export const getWeekdayNameKor = (weekday: WeekdayType) => {
  return WEEKDAYS_KOR[weekday];
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
export const aliasBeforeDate = (before: Date, current: Date): string => {
  const diff = diffDays(before, current);

  if (diff < 1) {
    const diffHour = Math.floor(
      (current.getTime() - before.getTime()) / 1000 / 60 / 60,
    );

    if (diffHour < 1) {
      const diffMin = Math.floor(
        (current.getTime() - before.getTime()) / 1000 / 60,
      );

      if (diffMin < 1) {
        return "방금 전";
      }

      return `${diffMin}분 전`;
    }

    if (diffHour < 24) {
      return `${diffHour}시간 전`;
    }
  }

  if (diff < 30) {
    return `${diff}일 전`;
  }

  if (diff < 365) {
    return `${Math.floor(diff / 30)}달 전`;
  }

  return `${Math.floor(diff / 365)}년 전`;
};
