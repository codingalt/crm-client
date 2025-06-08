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

const Calendar = ({
  selectedDate,
  setSelectedDate,
  activeDay,
  setActiveDay,
  tempDateSelected,
  setTempDateSelected,
}) => {
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

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const choosenDate = new Date(selectedDate);
      setActiveDay(choosenDate.getDate());
      setMonth(choosenDate.getMonth());
      setYear(choosenDate.getFullYear());
    } else {
      // Set today's date as the default active day
      setActiveDay(today.getDate());
    }
  }, [selectedDate]);

  useEffect(() => {
    if (month !== today.getMonth() || year !== today.getFullYear()) {
      if (!tempDateSelected) {
        setActiveDay(null); // Clear active day when changing months
      }
    }
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
  };

  const handleDayClick = (day) => {
    const newDate = new Date(year, month, day.date);

    if (day.past) {
      return;
    }

    if (!day.currentMonth) {
      if (day.date > 15) {
        // Clicked on a date from the previous month
        setMonth((prev) => (prev === 0 ? 11 : prev - 1));
        setYear((prev) => (month === 0 ? prev - 1 : prev));
        setActiveDay(day.date);
        setSelectedDate(formatDate(new Date(year, month - 1, day.date)));
        setTempDateSelected(formatDate(new Date(year, month - 1, day.date)));
      } else {
        // Clicked on a date from the next month
        setMonth((prev) => (prev === 11 ? 0 : prev + 1));
        setYear((prev) => (month === 11 ? prev + 1 : prev));
        setActiveDay(day.date);
        setSelectedDate(formatDate(new Date(year, month + 1, day.date)));
        setTempDateSelected(formatDate(new Date(year, month + 1, day.date)));
      }
    } else {
      // Clicked on a date from the current month
      setSelectedDate(formatDate(newDate));
      setTempDateSelected(formatDate(newDate));
      setActiveDay(day.date);
    }
  };

  const prevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setYear((prev) => (month === 0 ? prev - 1 : prev));
    setActiveDay(null);
  };

  const nextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setYear((prev) => (month === 11 ? prev + 1 : prev));
    setActiveDay(null);
  };

  const isPrevMonthDisabled =
    month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="calendar border shadow-sm">
      <div className="month">
        <div
          onClick={isPrevMonthDisabled ? null : prevMonth}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all flex items-center justify-center ${
            isPrevMonthDisabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-slate-50 hover:text-default-800"
          }`}
        >
          <FaChevronLeft />
        </div>

        <div className="date">
          {months[month]} {year}
        </div>
        <div
          onClick={nextMonth}
          className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer rounded-full transition-all flex items-center justify-center hover:bg-slate-50 hover:text-default-800"
        >
          <FaChevronRight className="cursor-pointer" />
        </div>
      </div>
      <div className="weekdays">
        <div>{t("sun")}</div>
        <div>{t("mon")}</div>
        <div>{t("tue")}</div>
        <div>{t("wed")}</div>
        <div>{t("thu")}</div>
        <div>{t("fri")}</div>
        <div>{t("sat")}</div>
      </div>
      <div className="days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`day ${
              day.past
                ? "disabled prev-date cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => handleDayClick(day)}
          >
            <p
              className={`${day.currentMonth ? "" : "other-month"} ${
                day.date === activeDay && day.currentMonth && !day.past
                  ? "active"
                  : ""
              } ${day.past ? "disabled prev-date cursor-not-allowed" : ""}`}
            >
              {day.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
