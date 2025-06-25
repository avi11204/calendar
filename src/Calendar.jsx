import React, { useState } from "react";
import dayjs from "dayjs";
import "./Calendar.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [reminders, setReminders] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newReminder, setNewReminder] = useState("");

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

  const handleDayClick = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    setNewReminder("");
  };

  const handleAddReminder = () => {
    if (!newReminder.trim()) return;
    setReminders((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newReminder.trim()],
    }));
    setSelectedDate(null);
  };

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
            const formatted = d.format("YYYY-MM-DD");
            const isToday = d.isSame(dayjs(), "day");
            const isCurrentMonth = d.isSame(currentDate, "month");

            return (
              <div
                key={index}
                className={`calendar-cell day ${
                  isToday ? "today" : isCurrentMonth ? "current-month" : "other-month"
                }`}
                onClick={() => handleDayClick(d)}
              >
                <div className="day-number">{d.date()}</div>
                <ul className="reminders-list">
                  {(reminders[formatted] || []).map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="reminder-popup">
          <div className="popup-content">
            <h4>Add Reminder for {dayjs(selectedDate).format("MMM D")}</h4>
            <input
              type="text"
              value={newReminder}
              placeholder="e.g. John's Birthday"
              onChange={(e) => setNewReminder(e.target.value)}
            />
            <div className="popup-actions">
              <button onClick={handleAddReminder}>Add</button>
              <button onClick={() => setSelectedDate(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
