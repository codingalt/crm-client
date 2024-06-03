import React, { useState } from "react";
import "./calendar.scss";
import classNames from "classnames";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getTableForMonth(year, month, average) {
  let firstDayInMonth = new Date(year, month, 1);
  let lastDayInMonth = new Date(year, month + 1, 0);
  let currentDate = new Date(firstDayInMonth),
    currentWeekDay = 0;
  let table = [[]],
    currentRow = 0;

  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  while (currentDate <= lastDayInMonth) {
    table[currentRow].push(new Date(currentDate));
    currentWeekDay = (currentWeekDay + 1) % 7;
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate.getDay() === 0 && currentDate <= lastDayInMonth) {
      table.push([]);
      currentRow += 1;
    }
  }

  if (currentDate.getDate() !== 6) {
    while (currentDate.getDay() !== 0) {
      table[currentRow].push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  if (!average) {
    return table;
  }

  function prependRow(table) {
    let extraRow = [];
    let extraDay = new Date(table[0][0]);
    extraDay.setDate(extraDay.getDate() - 7);
    do {
      extraRow.push(new Date(extraDay));
      extraDay.setDate(extraDay.getDate() + 1);
    } while (extraDay.getDay() !== 0);
    table.splice(0, 0, extraRow);
  }

  function appendRow(table) {
    let extraRow = [];
    let extraDay = new Date(table[table.length - 1][6]);
    extraDay.setDate(extraDay.getDate() + 1);
    do {
      extraRow.push(new Date(extraDay));
      extraDay.setDate(extraDay.getDate() + 1);
    } while (extraDay.getDay() !== 0);
    table.push(extraRow);
  }

  if (table.length === 5) {
    // average out the blank
    let inactiveInFirstRow = table[0].filter(
      (date) => date < firstDayInMonth
    ).length;
    let inactiveInLastRow = table[table.length - 1].filter(
      (date) => date > lastDayInMonth
    ).length;

    if (inactiveInFirstRow < inactiveInLastRow) {
      prependRow(table);
    } else {
      appendRow(table);
    }
  }

  if (table.length === 4) {
    prependRow(table);
    appendRow(table);
  }

  return table;
}

function sameDate(a, b) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

const CalendarRow = ({ row, begin, end, firstDate, lastDate, today }) => {
  let cells = row.map((cell) => {
    let year = cell.getFullYear(),
      month = cell.getMonth() + 1,
      fullDate = cell.toISOString().slice(0, 10);
    let active =
      (cell >= firstDate && cell <= lastDate) ||
      sameDate(cell, firstDate) ||
      sameDate(cell, lastDate);
    let classes = classNames({
      "calendar-cell": true,
      invalid: cell < begin || cell > end,
      today: sameDate(cell, today),
      active: active,
    });
    return (
      <td key={cell.toISOString().slice(0, 10)} className={classes}>
        <a
          href={active ? year + "/" + month + "/" + fullDate + ".html" : null}
          className="calendar-cell-link"
        >
          {cell.getDate()}
        </a>
      </td>
    );
  });

  return <tr className="calendar-row">{cells}</tr>;
};

const CalendarTable = ({ current, firstDate, lastDate, today }) => {
  let year = current.getFullYear(),
    month = current.getMonth();
  let firstDayInMonth = new Date(year, month, 1);
  let lastDayInMonth = new Date(year, month + 1, 0);
  let table = getTableForMonth(year, month);
  let rows = table.map((row, i) => {
    return (
      <CalendarRow
        begin={firstDayInMonth}
        end={lastDayInMonth}
        key={firstDayInMonth.toISOString().slice(0, 8) + i}
        row={row}
        firstDate={firstDate}
        lastDate={lastDate}
        today={today}
      />
    );
  });

  let names = DAY_NAMES.map((name) => (
    <th key={name} className="calendar-cell">
      {name[0]}
    </th>
  ));

  return (
    <div className="calendar-table-wrapper">
      <TransitionGroup>
        <CSSTransition
          key={"table-" + current.toISOString().slice(0, 7)}
          classNames="fade-slide-right"
          timeout={200}
        >
          <table className="calendar-table calendar-table-current">
            <thead className="calendar-table-head">
              <tr className="calendar-row">{names}</tr>
            </thead>
            <tbody className="calendar-table-body">{rows}</tbody>
          </table>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const CalendarHeader = ({ today, cTitle }) => {
  let year = today.getFullYear(),
    month = today.getMonth();
  let monthName = MONTH_NAMES[month].slice(0, 3);
  let day = DAY_NAMES[today.getDay()];
  let date = today.getDate();

  return (
    <nav className="calendar-header">
      <div className="calendar-header-date">
        <div className="year">{year}</div>
        <div className="day">{day}, </div>
        <div className="date">
          {" "}
          {monthName} {date}
        </div>
      </div>
      <h1 className="calendar-header-title">{cTitle}</h1>
    </nav>
  );
};

const CalendarControl = ({
  current,
  goToPrevMonth,
  goToNextMonth,
  firstDate,
  lastDate,
}) => {
  let year = current.getFullYear(),
    month = current.getMonth();
  let monthName = MONTH_NAMES[month];

  let prev = new Date(current);
  // assert: prev.getDate() === 1;
  let prevClasses = classNames({
    "calendar-control": true,
    prev: true,
    disabled: prev < firstDate,
  });

  prev.setDate(1);

  let next = new Date(current);
  next.setMonth(next.getMonth() + 1);
  let nextClasses = classNames({
    "calendar-control": true,
    next: true,
    disabled: next > lastDate,
  });

  return (
    <ul className="calendar-control-list">
      <li className="calendar-control-title">
        <TransitionGroup>
          <CSSTransition
            key={"title-" + current.toISOString().slice(0, 7)}
            classNames="fade-slide-down"
            timeout={200}
          >
            <div>
              {monthName} {year}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </li>
      <li className={prevClasses} onClick={goToPrevMonth}></li>
      <li className={nextClasses} onClick={goToNextMonth}></li>
    </ul>
  );
};

const Calendar = ({ today, firstDate, lastDate, cTitle }) => {
  const [current, setCurrent] = useState(
    new Date(lastDate.getFullYear(), lastDate.getMonth(), 1)
  );

  const goToPrevMonth = (e) => {
    e.preventDefault();
    let prevMonth = new Date(current);
    // assert: prevMonth.getDate() === 1

    if (firstDate < prevMonth) {
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      setCurrent(prevMonth);
    }
  };

  const goToNextMonth = (e) => {
    e.preventDefault();
    let nextMonth = new Date(current);
    // assert: nextMonth.getDate() === 1
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    if (lastDate > nextMonth) {
      setCurrent(nextMonth);
    }
  };

  return (
    <div className="calendar-wrapper">
      <CalendarHeader today={today} cTitle={cTitle} />
      <div className="calendar-body">
        <CalendarControl
          current={current}
          goToPrevMonth={goToPrevMonth}
          goToNextMonth={goToNextMonth}
          lastDate={lastDate}
          firstDate={firstDate}
        />
        <CalendarTable
          current={current}
          today={today}
          lastDate={lastDate}
          firstDate={firstDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
