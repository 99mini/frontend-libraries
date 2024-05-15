import { describe, expect, test } from "@jest/globals";
import {
  endOfYaerMonth,
  getMonthNameEng,
  getMonthNameKor,
  getWeekdayIndex,
  getWeekdayNameEng,
  getWeekdayNameKor,
  diffDays,
  addDays,
  aliasBeforeDate,
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

describe("getMonthNameEng", () => {
  test("영어 월 이름", () => {
    expect(getMonthNameEng(1)).toBe("Jan");
    expect(getMonthNameEng(2)).toBe("Feb");
    expect(getMonthNameEng(3)).toBe("Mar");
    expect(getMonthNameEng(4)).toBe("Apr");
    expect(getMonthNameEng(5)).toBe("May");
    expect(getMonthNameEng(6)).toBe("Jun");
    expect(getMonthNameEng(7)).toBe("Jul");
    expect(getMonthNameEng(8)).toBe("Aug");
    expect(getMonthNameEng(9)).toBe("Sep");
    expect(getMonthNameEng(10)).toBe("Oct");
    expect(getMonthNameEng(11)).toBe("Nov");
    expect(getMonthNameEng(12)).toBe("Dec");
  });
});

describe("getMonthNameKor", () => {
  test("한글 월 이름", () => {
    expect(getMonthNameKor(1)).toBe("1월");
    expect(getMonthNameKor(2)).toBe("2월");
    expect(getMonthNameKor(3)).toBe("3월");
    expect(getMonthNameKor(4)).toBe("4월");
    expect(getMonthNameKor(5)).toBe("5월");
    expect(getMonthNameKor(6)).toBe("6월");
    expect(getMonthNameKor(7)).toBe("7월");
    expect(getMonthNameKor(8)).toBe("8월");
    expect(getMonthNameKor(9)).toBe("9월");
    expect(getMonthNameKor(10)).toBe("10월");
    expect(getMonthNameKor(11)).toBe("11월");
    expect(getMonthNameKor(12)).toBe("12월");
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
});

describe("getWeekdayNameEng", () => {
  test("영어 요일 이름", () => {
    expect(getWeekdayNameEng(0)).toBe("Sun");
    expect(getWeekdayNameEng(1)).toBe("Mon");
    expect(getWeekdayNameEng(2)).toBe("Tue");
    expect(getWeekdayNameEng(3)).toBe("Wed");
    expect(getWeekdayNameEng(4)).toBe("Thu");
    expect(getWeekdayNameEng(5)).toBe("Fri");
    expect(getWeekdayNameEng(6)).toBe("Sat");
  });
});

describe("getWeekdayNameKor", () => {
  test("한글 요일 이름", () => {
    expect(getWeekdayNameKor(0)).toBe("일");
    expect(getWeekdayNameKor(1)).toBe("월");
    expect(getWeekdayNameKor(2)).toBe("화");
    expect(getWeekdayNameKor(3)).toBe("수");
    expect(getWeekdayNameKor(4)).toBe("목");
    expect(getWeekdayNameKor(5)).toBe("금");
    expect(getWeekdayNameKor(6)).toBe("토");
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
  test("이전 날짜", () => {
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
});
