import { useRef, useState } from "react";
import {
  FaCalendarDay,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";
import { useBookingParams } from "../../hooks/bookingsHooks";
import { addDays, shortISO } from "../../utils/date-wrangler.ts";

export default function WeekPicker() {
  const [dateText, setDateText] = useState("2020-06-24");
  const textBoxRef = useRef<HTMLInputElement>(null);

  const { date, setBookingsDate: goToDate } = useBookingParams();

  const dates = {
    prev: shortISO(addDays(date, -7)),
    next: shortISO(addDays(date, 7)),
    today: shortISO(new Date()),
  };

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => goToDate(dates.prev)}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => goToDate(dates.today)}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type={"text"}
            ref={textBoxRef}
            value={dateText}
            onChange={(event) => setDateText(event.target.value)}
            placeholder={"e.g. 2020-09-02"}
          />
          <button
            className={"go btn"}
            onClick={() => {
              textBoxRef.current && goToDate(textBoxRef.current.value);
            }}
          >
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => goToDate(dates.next)}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
    </div>
  );
}
