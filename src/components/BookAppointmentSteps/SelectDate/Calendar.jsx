import React, { useEffect, useState } from "react";
import "./Calendar.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const { t } = useTranslation();

  const months = [
    t("january"),
    t("february"),
    t("march"),
    t("april"),
    t("may"),
    t("june"),
    t("july"),
    t("august"),
    t("september"),
    t("october"),
    t("november"),
    t("december"),
  ];

  const [today] = useState(new Date());
  const [activeDay, setActiveDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [days, setDays] = useState([]);
  console.log(month);
  useEffect(() => {
    if (selectedDate) {
      const choosenDate = new Date(selectedDate);
      setActiveDay(choosenDate.getDate());
      setMonth(choosenDate.getMonth());
      setYear(choosenDate.getFullYear());
    }
  }, [selectedDate]);

  useEffect(() => {
    initCalendar();
  }, [month, year]);

  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    let daysArray = [];

    for (let x = day; x > 0; x--) {
      daysArray.push({
        date: prevDays - x + 1,
        currentMonth: false,
        past: true,
      });
    }

    for (let i = 1; i <= lastDate; i++) {
      const dateToCheck = new Date(year, month, i);
      const isPast =
        dateToCheck <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());
      daysArray.push({ date: i, currentMonth: true, past: isPast });
    }

    for (let j = 1; j <= nextDays; j++) {
      daysArray.push({ date: j, currentMonth: false, past: false });
    }

    setDays(daysArray);
    // Automatically select the current day if it's in the current month and year
    if (month === today.getMonth() && year === today.getFullYear()) {
      setActiveDay(today.getDate());
    } else {
      setActiveDay(null);
    }
  };

  const handleDayClick = (day) => {
    if (day.past) {
      return;
    }

    const selected = new Date(year, month, day.date);
    setSelectedDate(formatDate(selected));

    setActiveDay(day.date);
    if (!day.currentMonth) {
      if (day.date > 15) {
        prevMonth();
      } else {
        nextMonth();
      }
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="calendar">
      <div className="month">
        <FaChevronLeft className="cursor-pointer" onClick={prevMonth} />
        <div className="date">
          {months[month]} {year}
        </div>
        <FaChevronRight className="cursor-pointer" onClick={nextMonth} />
      </div>
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`day ${day.currentMonth ? "" : "other-month"} ${
              day.date === activeDay && day.currentMonth && !day.past
                ? "active"
                : ""
            } ${day.past ? "disabled prev-date" : ""}`}
            onClick={() => handleDayClick(day)}
          >
            {day.date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
