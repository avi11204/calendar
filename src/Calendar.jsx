
import React, { useState } from "react";
import "./Calender.css";

const categories = {
  birthday: "🎂 Birthday",
  meeting: "📅 Meeting",
  festive: "🎉 Festive",
  reminder: "⏰ Reminder",
};

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [reminderText, setReminderText] = useState("");
  const [category, setCategory] = useState("reminder");
  const [theme, setTheme] = useState("light");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const prevDays = firstDay.getDay();
  const nextDays = 6 - lastDay.getDay();

  const getCalendarDays = () => {
    const days = [];
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();

    for (let i = prevDays; i > 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthLastDay - i + 1),
        current: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        current: true,
      });
    }

    for (let i = 1; i <= nextDays; i++) {
      days.push({
        date: new Date(currentYear, currentMonth + 1, i),
        current: false,
      });
    }

    return days;
  };

  const isToday = (date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const handleReminderAdd = () => {
    const key = selectedDate.toDateString();
    const newReminder = {
      text: reminderText,
      category,
      id: Date.now(),
    };
    const existing = reminders[key] || [];
    setReminders({ ...reminders, [key]: [...existing, newReminder] });
    setReminderText("");
    setCategory("reminder");
    setPopupOpen(false);
  };

  const handleReminderDelete = (dateKey, id) => {
    const updated = reminders[dateKey].filter((r) => r.id !== id);
    setReminders({ ...reminders, [dateKey]: updated });
  };

  const getCategoryIcon = (type) => {
    return categories[type]?.split(" ")[0] || "⏰";
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    setCurrentYear(Number(e.target.value));
  };

  return (
    <div className="calendar-wrapper" data-theme={theme}>
      <button className="theme-toggle" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "🌙 Dark" : "🌞 Light"}
      </button>

      <div className="calendar">
        <div className="calendar-nav">
          <button onClick={handlePrevMonth}>&lt;</button>
          <div className="month-year">
            <select value={currentMonth} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
            <select value={currentYear} onChange={handleYearChange}>
              {Array.from({ length: 201 }, (_, i) => {
                const year = 1900 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>

        <div className="calendar-grid">
          {daysOfWeek.map((day) => (
            <div key={day} className="weekday">{day}</div>
          ))}
          {getCalendarDays().map(({ date, current }) => {
            const key = date.toDateString();
            const hasReminder = reminders[key]?.length > 0;
            return (
              <div
                key={date}
                className={`calendar-cell ${isToday(date) ? "today" : current ? "current-month" : "other-month"} ${hasReminder ? "has-reminder" : ""}`}
                onClick={() => {
                  setSelectedDate(date);
                  setPopupOpen(true);
                }}
              >
                <div className="day-number">{date.getDate()}</div>
                <ul className="reminders-list">
                  {(reminders[key] || []).map((r) => (
                    <li key={r.id}>
                      {getCategoryIcon(r.category)} {r.text}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReminderDelete(key, r.id);
                        }}
                      >
                        ✖
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {popupOpen && (
        <div className="reminder-popup">
          <div className="popup-content">
            <h4>Add Reminder for {selectedDate?.toDateString()}</h4>
            <input
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
              placeholder="Reminder text..."
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {categories[cat]}
                </option>
              ))}
            </select>
            <div className="popup-actions">
              <button onClick={handleReminderAdd}>Add</button>
              <button onClick={() => setPopupOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <button className="add-reminder-button" onClick={() => {
        setSelectedDate(today);
        setPopupOpen(true);
      }}>
        +
      </button>
    </div>
  );
};

export default Calendar;
