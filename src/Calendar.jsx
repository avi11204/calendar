import React, { useState } from "react";
import dayjs from "dayjs";
import "./Calender.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDay = currentDate.startOf("month").startOf("week");
  const endDay = currentDate.endOf("month").endOf("week");

  const days = [];
  let day = startDay;

  while (day.isBefore(endDay, "day") || day.isSame(endDay, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={prevMonth}>‹</button>
          <h2>{currentDate.format("MMMM YYYY")}</h2>
          <button onClick={nextMonth}>›</button>
        </div>

        <div className="calendar-grid calendar-weekdays">
          {weekdays.map((d) => (
            <div key={d} className="calendar-cell weekday">
              {d}
            </div>
          ))}
        </div>

        <div className="calendar-grid calendar-days">
          {days.map((d, index) => {
            const isToday = d.isSame(dayjs(), "day");
            const isCurrentMonth = d.isSame(currentDate, "month");

            return (
              <div
                key={index}
                className={`calendar-cell day ${
                  isToday ? "today" : isCurrentMonth ? "current-month" : "other-month"
                }`}
              >
                {d.date()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
