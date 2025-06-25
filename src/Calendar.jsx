import React, { useState, useEffect } from 'react';
import './Calender.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminders, setReminders] = useState({});
  const [newReminder, setNewReminder] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setNewReminder('');
    setShowPopup(true);
  };

  const handleSaveReminder = () => {
    if (!newReminder.trim()) return;
    const key = selectedDate.toDateString();
    setReminders((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newReminder]
    }));
    setShowPopup(false);
  };

  const getCalendarDays = () => {
    const days = [];
    const prevMonthDays = startDay;
    const totalCells = Math.ceil((daysInMonth + prevMonthDays) / 7) * 7;
    const today = new Date();

    for (let i = 0; i < totalCells; i++) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - startDay + 1);
      const isCurrentMonth = day.getMonth() === currentDate.getMonth();
      const isToday =
        day.toDateString() === today.toDateString();

      const key = day.toDateString();
      const hasReminder = reminders[key]?.length > 0;

      days.push(
        <div
          key={i}
          className={`calendar-cell day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''} ${hasReminder ? 'has-reminder' : ''}`}
          onClick={() => handleDayClick(day)}
        >
          <div className="day-number">{day.getDate()}</div>
          <ul className="reminders-list">
            {(reminders[key] || []).slice(0, 2).map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={prevMonth}>←</button>
          <h2>
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth}>→</button>
        </div>

        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div className="weekday" key={day}>
              {day}
            </div>
          ))}
          {getCalendarDays()}
        </div>
      </div>

      <button
        className="add-reminder-button"
        onClick={() => {
          setSelectedDate(new Date());
          setShowPopup(true);
        }}
      >
        +
      </button>

      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      {showPopup && (
        <div className="reminder-popup">
          <div className="popup-content">
            <h4>Add Reminder - {selectedDate?.toDateString()}</h4>
            <input
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="Enter reminder"
            />
            <div className="popup-actions">
              <button onClick={handleSaveReminder}>Save</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
