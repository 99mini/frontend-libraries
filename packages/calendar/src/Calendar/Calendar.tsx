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
  year: number;
  month: MonthType;
};

export const Calendar = ({
  locale = "kor",
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

  const weeksCount = Math.ceil((startWeekdayIndex + endOfMonth) / 7);

  const [selectedDate, setSelectedDate] = useState<number | undefined>(
    undefined,
  );

  const handleSelectDate = (date: number) => setSelectedDate(date);

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
                      selected: selectedDate === day,
                      empty: emptyCondition,
                    },
                  )}
                >
                  {!emptyCondition && (
                    <Button
                      className={classNames("YnI-Calender-Cell-Button")}
                      onClick={() => handleSelectDate(day)}
                    >
                      {day}
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
