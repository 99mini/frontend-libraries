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
    <div {...props} className={classNames("Mini-Calendar", props.className)}>
      <header className={classNames("Mini-Calendar-Header")}>
        {`${year}${isKor ? "년" : ""}, ${monthName}`}
      </header>
      <ol className={classNames("Mini-Calendar-Weekdays")}>
        {weekdays.map((weekday) => (
          <li
            key={weekday}
            className={classNames(
              "Mini-Calendar-Weekday",
              "Mini-Calendar-Cell",
            )}
          >
            {weekday}
          </li>
        ))}
      </ol>
      <ol className={classNames("Mini-Calendar-Days")}>
        {Array.from({ length: weeksCount }).map((_, week) => {
          return (
            <ol key={week} className={classNames("Mini-Calendar-Row")}>
              {Array.from({ length: 7 }).map((_, index) => {
                const day = week * 7 + index + 1 - startWeekdayIndex;
                if (week === 0 && index < startWeekdayIndex) {
                  return (
                    <li
                      key={day}
                      className={classNames(
                        "Mini-Calendar-Day",
                        "Mini-Calendar-Cell",
                        "empty",
                      )}
                    />
                  );
                }

                if (day > endOfMonth) {
                  return (
                    <li
                      key={day}
                      className={classNames(
                        "Mini-Calendar-Day",
                        "Mini-Calendar-Cell",
                        "empty",
                      )}
                    />
                  );
                }

                return (
                  <li
                    key={day}
                    className={classNames(
                      "Mini-Calendar-Day",
                      "Mini-Calendar-Cell",
                      {
                        selected: selectedDate === day,
                      },
                    )}
                  >
                    <Button
                      className={classNames("Mini-Calender-Cell-Button")}
                      onClick={() => handleSelectDate(day)}
                    >
                      {day}
                    </Button>
                  </li>
                );
              })}
            </ol>
          );
        })}
      </ol>
    </div>
  );
};

export default Calendar;
