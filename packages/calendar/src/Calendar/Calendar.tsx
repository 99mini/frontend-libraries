import React, { useState } from "react";
import classNames from "classnames";

import { Button } from "@99mini/atom";
import {
  LocaleType,
  MonthType,
  WEEKDAYS_ENG,
  WEEKDAYS_KOR,
  endOfYaerMonth,
  getMonthName,
  getWeekdayIndex,
} from "@99mini/utils";

import "./Calendar.scss";

export type CalendarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  CalendarPropsType;

type CalendarPropsType = {
  locale?: LocaleType;
  range?: boolean;
  pagenation?: boolean;

  year: number;
  month: MonthType;
};

const today = new Date();

/**
 * TODO: utils로 빼기
 */
const equalDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const Calendar = ({
  locale = "kor",
  range = false,
  pagenation = false,
  year: initialYear,
  month: initialMonth,
  ...props
}: CalendarProps) => {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDateList, setSelectedDateList] = useState<Date[] | undefined>(
    undefined,
  );

  const isKor = locale === "kor";
  const monthName = getMonthName(month, locale);
  const weekdays = isKor ? WEEKDAYS_KOR : WEEKDAYS_ENG;

  const startWeekdayIndex = getWeekdayIndex(year, month, 1);
  const endOfMonth = endOfYaerMonth(year, month);

  if (startWeekdayIndex === undefined) {
    throw new Error("invalid date");
  }

  const weeksCount = Math.ceil((startWeekdayIndex + endOfMonth) / 7);

  const handleSelectDate = (date: Date) => {
    setSelectedDateList((prevDateList) => {
      if (prevDateList === undefined) {
        return [date];
      }

      if (prevDateList.length > 0 && prevDateList[0] < date) {
        return [prevDateList[0], date];
      }

      return [date];
    });
  };

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
      return;
    }

    setMonth((month - 1) as MonthType);
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
      return;
    }

    setMonth((month + 1) as MonthType);
  };

  return (
    <div {...props} className={classNames("YnI-Calendar", props.className)}>
      <header className={classNames("YnI-Calendar-Header")}>
        {pagenation && (
          <Button
            className={classNames("pagenation")}
            onClick={handlePrevMonth}
          >
            prev
          </Button>
        )}
        <div
          className={classNames("year-month")}
        >{`${year}${isKor ? "년" : ""}, ${monthName}`}</div>
        {pagenation && (
          <Button
            className={classNames("pagenation")}
            onClick={handleNextMonth}
          >
            next
          </Button>
        )}
      </header>
      <ol className={classNames("YnI-Calendar-Weekdays")}>
        {weekdays.map((weekday) => (
          <li
            key={weekday}
            className={classNames("YnI-Calendar-Weekday", "YnI-Calendar-Cell")}
          >
            {weekday}
          </li>
        ))}
      </ol>
      <ol className={classNames("YnI-Calendar-Days")}>
        {Array.from({ length: weeksCount }).map((_, week) => (
          <ol key={week} className={classNames("YnI-Calendar-Row")}>
            {Array.from({ length: 7 }).map((_, index) => {
              const day = week * 7 + index + 1 - startWeekdayIndex;
              const dayDate = new Date(year, month - 1, day);
              const emptyCondition =
                (week === 0 && index < startWeekdayIndex) || day > endOfMonth;

              return (
                <li
                  key={day}
                  className={classNames(
                    "YnI-Calendar-Day",
                    "YnI-Calendar-Cell",
                    {
                      selected:
                        selectedDateList &&
                        selectedDateList.some((selected) => {
                          return equalDate(selected, dayDate);
                        }),
                      empty: emptyCondition,
                      today: equalDate(today, dayDate),
                      range:
                        range &&
                        selectedDateList?.length === 2 &&
                        selectedDateList[0] <= dayDate &&
                        selectedDateList[1] >= dayDate,
                      "range-start":
                        range &&
                        selectedDateList?.length === 2 &&
                        equalDate(selectedDateList?.[0], dayDate),
                      "range-end":
                        range &&
                        selectedDateList?.length === 2 &&
                        equalDate(selectedDateList?.[1], dayDate),
                    },
                  )}
                >
                  {!emptyCondition && (
                    <Button
                      className={classNames("YnI-Calender-Cell-Button")}
                      onClick={() => handleSelectDate(dayDate)}
                    >
                      <span className={classNames("background")} />
                      <span className={classNames("day")}>{day}</span>
                    </Button>
                  )}
                </li>
              );
            })}
          </ol>
        ))}
      </ol>
    </div>
  );
};

export default Calendar;
