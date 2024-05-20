import { describe, expect, test } from "@jest/globals";
import {
  endOfYaerMonth,
  getMonthName,
  getWeekdayIndex,
  getWeekdayName,
  diffDays,
  addDays,
  aliasBeforeDate,
  equalDate,
} from "./date";

describe("endOfYaerMonth", () => {
  test("윤달 계산", () => {
    expect(endOfYaerMonth(2024, 2)).toBe(29);
    expect(endOfYaerMonth(2025, 2)).toBe(28);
  });
  test("31일 달 계산", () => {
    expect(endOfYaerMonth(2024, 1)).toBe(31);
    expect(endOfYaerMonth(2024, 3)).toBe(31);
    expect(endOfYaerMonth(2024, 5)).toBe(31);
    expect(endOfYaerMonth(2024, 7)).toBe(31);
    expect(endOfYaerMonth(2024, 8)).toBe(31);
    expect(endOfYaerMonth(2024, 12)).toBe(31);
  });
  test("30일 달 계산", () => {
    expect(endOfYaerMonth(2024, 4)).toBe(30);
    expect(endOfYaerMonth(2024, 6)).toBe(30);
    expect(endOfYaerMonth(2024, 9)).toBe(30);
    expect(endOfYaerMonth(2024, 11)).toBe(30);
  });
});

describe("getMonthName", () => {
  test("영어 월 이름", () => {
    expect(getMonthName(1, "en")).toBe("Jan");
    expect(getMonthName(2, "en")).toBe("Feb");
    expect(getMonthName(3, "en")).toBe("Mar");
    expect(getMonthName(4, "en")).toBe("Apr");
    expect(getMonthName(5, "en")).toBe("May");
    expect(getMonthName(6, "en")).toBe("Jun");
    expect(getMonthName(7, "en")).toBe("Jul");
    expect(getMonthName(8, "en")).toBe("Aug");
    expect(getMonthName(9, "en")).toBe("Sep");
    expect(getMonthName(10, "en")).toBe("Oct");
    expect(getMonthName(11, "en")).toBe("Nov");
    expect(getMonthName(12, "en")).toBe("Dec");
  });

  test("한글 월 이름", () => {
    expect(getMonthName(1)).toBe("1월");
    expect(getMonthName(2)).toBe("2월");
    expect(getMonthName(3)).toBe("3월");
    expect(getMonthName(4)).toBe("4월");
    expect(getMonthName(5)).toBe("5월");
    expect(getMonthName(6)).toBe("6월");
    expect(getMonthName(7)).toBe("7월");
    expect(getMonthName(8)).toBe("8월");
    expect(getMonthName(9)).toBe("9월");
    expect(getMonthName(10)).toBe("10월");
    expect(getMonthName(11)).toBe("11월");
    expect(getMonthName(12)).toBe("12월");
  });
});

describe("getWeekdayIndex", () => {
  test("요일 인덱스", () => {
    expect(getWeekdayIndex(2024, 5, 12)).toBe(0);
    expect(getWeekdayIndex(2024, 5, 13)).toBe(1);
    expect(getWeekdayIndex(2024, 5, 14)).toBe(2);
    expect(getWeekdayIndex(2024, 5, 1)).toBe(3);
    expect(getWeekdayIndex(2024, 5, 16)).toBe(4);
    expect(getWeekdayIndex(2024, 5, 17)).toBe(5);
    expect(getWeekdayIndex(2024, 5, 18)).toBe(6);
  });
  test("invalid date", () => {
    expect(getWeekdayIndex(2024, 5, 0)).toBe(undefined);
    expect(getWeekdayIndex(2024, 5, 32)).toBe(undefined);
    expect(getWeekdayIndex(-1, 1, 1)).toBe(undefined);
  });
});

describe("getWeekdayName", () => {
  test("영어 요일 이름", () => {
    expect(getWeekdayName(0, "en")).toBe("Sun");
    expect(getWeekdayName(1, "en")).toBe("Mon");
    expect(getWeekdayName(2, "en")).toBe("Tue");
    expect(getWeekdayName(3, "en")).toBe("Wed");
    expect(getWeekdayName(4, "en")).toBe("Thu");
    expect(getWeekdayName(5, "en")).toBe("Fri");
    expect(getWeekdayName(6, "en")).toBe("Sat");
  });
  test("한글 요일 이름", () => {
    expect(getWeekdayName(0)).toBe("일");
    expect(getWeekdayName(1)).toBe("월");
    expect(getWeekdayName(2)).toBe("화");
    expect(getWeekdayName(3)).toBe("수");
    expect(getWeekdayName(4)).toBe("목");
    expect(getWeekdayName(5)).toBe("금");
    expect(getWeekdayName(6)).toBe("토");
  });
});

describe("diffDays", () => {
  test("날짜 차이 계산", () => {
    expect(diffDays(new Date(2024, 5, 12), new Date(2024, 5, 12))).toBe(0);
    expect(diffDays(new Date(2024, 5, 12), new Date(2024, 5, 13))).toBe(1);
    expect(diffDays(new Date(2024, 5, 12), new Date(2024, 5, 11))).toBe(-1);
    expect(diffDays(new Date(2024, 5, 12), new Date(2024, 5, 22))).toBe(10);
    expect(diffDays(new Date(2024, 5, 12), new Date(2024, 5, 2))).toBe(-10);
    expect(diffDays(new Date(2024, 5, 12), new Date(2024, 6, 2))).toBe(20);
    expect(diffDays(new Date(2024, 5, 12), new Date(2024, 4, 2))).toBe(-41);
    expect(diffDays(new Date(2024, 5, 12), new Date(2025, 5, 12))).toBe(365);
    expect(diffDays(new Date(2024, 5, 12), new Date(2023, 5, 12))).toBe(-366);
  });
});

describe("addDays", () => {
  test("날짜 더하기", () => {
    expect(addDays(new Date(2024, 5, 12), 0)).toEqual(new Date(2024, 5, 12));
    expect(addDays(new Date(2024, 5, 12), 1)).toEqual(new Date(2024, 5, 13));
    expect(addDays(new Date(2024, 5, 12), -1)).toEqual(new Date(2024, 5, 11));
    expect(addDays(new Date(2024, 5, 12), 10)).toEqual(new Date(2024, 5, 22));
    expect(addDays(new Date(2024, 5, 12), -10)).toEqual(new Date(2024, 5, 2));
    expect(addDays(new Date(2024, 5, 12), 20)).toEqual(new Date(2024, 6, 2));
    expect(addDays(new Date(2024, 5, 12), -41)).toEqual(new Date(2024, 4, 2));
    expect(addDays(new Date(2024, 5, 12), 365)).toEqual(new Date(2025, 5, 12));
    expect(addDays(new Date(2024, 5, 12), -366)).toEqual(new Date(2023, 5, 12));
  });
});

describe("aliasBeforeDate", () => {
  test("[한국]이전 날짜", () => {
    expect(
      aliasBeforeDate(
        new Date(2024, 5, 12, 2, 59, 30),
        new Date(2024, 5, 12, 3),
      ),
    ).toEqual("방금 전");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12, 2, 30), new Date(2024, 5, 12, 3)),
    ).toEqual("30분 전");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12, 2), new Date(2024, 5, 12, 3, 30)),
    ).toEqual("1시간 전");
    expect(
      aliasBeforeDate(new Date(2024, 5, 11, 0), new Date(2024, 5, 11, 23)),
    ).toEqual("23시간 전");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 5, 13)),
    ).toEqual("1일 전");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 5, 14)),
    ).toEqual("2일 전");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 6, 20)),
    ).toEqual("1달 전");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2025, 6, 14)),
    ).toEqual("1년 전");
  });

  test("[영어]이전 날짜: 방금 전", () => {
    expect(
      aliasBeforeDate(
        new Date(2024, 5, 12, 2, 59, 30),
        new Date(2024, 5, 12, 3),
        "en",
      ),
    ).toEqual("just now");
  });

  test("[영어]이전 날짜: 단수", () => {
    expect(
      aliasBeforeDate(
        new Date(2024, 5, 12, 2, 59),
        new Date(2024, 5, 12, 3),
        "en",
      ),
    ).toEqual("1minute ago");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12, 2), new Date(2024, 5, 12, 3), "en"),
    ).toEqual("1hour ago");

    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 5, 13), "en"),
    ).toEqual("1day ago");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 6, 20), "en"),
    ).toEqual("1month ago");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2025, 6, 14), "en"),
    ).toEqual("1year ago");
  });
  test("[영어]이전 날짜: 복수", () => {
    expect(
      aliasBeforeDate(
        new Date(2024, 5, 12, 2, 58),
        new Date(2024, 5, 12, 3),
        "en",
      ),
    ).toEqual("2minutes ago");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12, 2), new Date(2024, 5, 12, 4), "en"),
    ).toEqual("2hours ago");

    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 5, 14), "en"),
    ).toEqual("2days ago");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2024, 7, 20), "en"),
    ).toEqual("2months ago");
    expect(
      aliasBeforeDate(new Date(2024, 5, 12), new Date(2026, 6, 14), "en"),
    ).toEqual("2years ago");
  });
});

describe("equalDate", () => {
  test("날짜 비교", () => {
    expect(equalDate(new Date(2024, 5, 12), new Date(2024, 5, 12))).toBe(true);
    expect(equalDate(new Date(2024, 5, 12), new Date(2024, 5, 13))).toBe(false);
  });
});
