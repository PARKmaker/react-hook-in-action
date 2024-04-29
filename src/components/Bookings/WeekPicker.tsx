import { Dispatch, useState } from "react";
import {
  FaCalendarDay,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";
import { SET_DATE } from "./weekReducerActions.ts";
import { TDateAction } from "./weekReducer.ts";

export default function WeekPicker({
  dispatch,
}: {
  dispatch: Dispatch<TDateAction>;
}) {
  const [dateText, setDateText] = useState("2020-06-24");

  const goToDate = () => {
    dispatch({
      type: SET_DATE,
      payload: dateText,
      // payload: textBoxRef.current.value,
    });
  };

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type={"text"}
            // ref={textBoxRef}
            value={dateText}
            onChange={(event) => setDateText(event.target.value)}
            placeholder={"e.g. 2020-09-02"}
            // defaultValue={"2020-06-24"}
          />
          <button className={"go btn"} onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      {/*<p>*/}
      {/*  {week.start.toDateString()} - {week.end.toDateString()}*/}
      {/*</p>*/}
    </div>
  );
}
