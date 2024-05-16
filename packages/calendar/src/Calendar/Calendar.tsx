import React from "react";
import classNames from "classnames";
import "./Calendar.scss";

export type CalendarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  CalendarPropsType;

type CalendarPropsType = {};

export const Calendar = ({ ...props }: CalendarProps) => {
  return (
    <div
      {...props}
      className={classNames("Mini-Calendar", props.className)}
    ></div>
  );
};

export default Calendar;
