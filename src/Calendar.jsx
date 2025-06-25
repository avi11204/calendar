// Calendar.jsx
import React, { useState } from "react";
import dayjs from "dayjs";

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
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="text-gray-600 hover:text-black text-2xl"
        >
          ‹
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={nextMonth}
          className="text-gray-600 hover:text-black text-2xl"
        >
          ›
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-gray-800">
        {days.map((d, idx) => {
          const isCurrentMonth = d.isSame(currentDate, "month");
          const isToday = d.isSame(dayjs(), "day");
          return (
            <div
              key={idx}
              className={`p-2 rounded-xl transition cursor-pointer
                ${isCurrentMonth ? "bg-gray-100" : "text-gray-400"}
                ${isToday ? "bg-blue-600 text-white font-bold" : ""}
                hover:bg-blue-100`}
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
