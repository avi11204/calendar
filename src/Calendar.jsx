import React, { useState } from "react";
import dayjs from "dayjs";
import "./Calender.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDay = currentDate.startOf("month").startOf("week");
  const endDay = currentDate.endOf("month").endOf("week");

  const days = [];
  let day = startDay;

  while (day.isBefore(endDay, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      <div className="calendar-weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-days">
        {days.map((d, idx) => {
          const isCurrentMonth = d.isSame(currentDate, "month");
          const isToday = d.isSame(dayjs(), "day");

          return (
            <div
              key={idx}
              className={`calendar-day ${
                isToday ? "today" : isCurrentMonth ? "current" : "other"
              }`}
            >
              {d.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
