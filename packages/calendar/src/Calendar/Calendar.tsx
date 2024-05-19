import React, { useState } from "react";
import classNames from "classnames";
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
import { Button } from "@99mini/atom";

export type CalendarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  CalendarPropsType;

type CalendarPropsType = {
  locale?: LocaleType;
  range?: boolean;
  year: number;
  month: MonthType;
};

export const Calendar = ({
  locale = "kor",
  range = false,
  year,
  month,
  ...props
}: CalendarProps) => {
  const isKor = locale === "kor";
  const monthName = getMonthName(month, locale);
  const weekdays = isKor ? WEEKDAYS_KOR : WEEKDAYS_ENG;

  const startWeekdayIndex = getWeekdayIndex(year, month, 1);
  const endOfMonth = endOfYaerMonth(year, month);

  if (startWeekdayIndex === undefined) {
    throw new Error("invalid date");
  }

  const today = new Date().getDate();

  const weeksCount = Math.ceil((startWeekdayIndex + endOfMonth) / 7);

  const [selectedDateList, setSelectedDateList] = useState<
    number[] | undefined
  >(undefined);

  const handleSelectDate = (date: number) => {
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

  return (
    <div {...props} className={classNames("YnI-Calendar", props.className)}>
      <header className={classNames("YnI-Calendar-Header")}>
        {`${year}${isKor ? "년" : ""}, ${monthName}`}
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
              const emptyCondition =
                (week === 0 && index < startWeekdayIndex) || day > endOfMonth;

              return (
                <li
                  key={day}
                  className={classNames(
                    "YnI-Calendar-Day",
                    "YnI-Calendar-Cell",
                    {
                      selected: selectedDateList?.includes(day),
                      empty: emptyCondition,
                      today: today === day,
                      range:
                        range &&
                        selectedDateList?.length === 2 &&
                        selectedDateList[0] <= day &&
                        selectedDateList[1] >= day,
                      "range-start":
                        range &&
                        selectedDateList?.length === 2 &&
                        selectedDateList?.[0] === day,
                      "range-end":
                        range &&
                        selectedDateList?.length === 2 &&
                        selectedDateList?.[1] === day,
                    },
                  )}
                >
                  {!emptyCondition && (
                    <Button
                      className={classNames("YnI-Calender-Cell-Button")}
                      onClick={() => handleSelectDate(day)}
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
