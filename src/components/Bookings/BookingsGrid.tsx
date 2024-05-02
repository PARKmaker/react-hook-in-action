import { TBookable } from "../../Types/bookableType.ts";
import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { TDateState } from "./reducer/weekReducer.ts";
import Spinner from "../UI/Spinner.tsx";
import { TBooking } from "../../Types/bookingType.ts";
import { useBookings, useGrid } from "../../hooks/bookingsHooks";

type Props = {
  week: TDateState;
  bookable: TBookable | undefined;
  booking: TBooking | null;
  setBooking: Dispatch<SetStateAction<TBooking | null>>;
};
export default function BookingsGrid({
  week,
  bookable,
  booking,
  setBooking,
}: Props) {
  const { bookings, status, error } = useBookings(
    bookable?.id,
    week.start,
    week.end,
  );

  const { grid, sessions, dates } = useGrid(bookable, week.start);

  // 2. 효과
  useEffect(() => {
    setBooking(null);
  }, [week.start, bookable, setBooking]);

  if (!grid) {
    return <p>Waiting for bookable and week details</p>;
  }
  // 3. UI 도우미
  const cell = (session: string, date: string) => {
    const cellData = bookings?.[session]?.[date] || grid[session][date];

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : undefined}
        onClick={status === "success" ? () => setBooking(cellData) : undefined}
      >
        {cellData.title}
      </td>
    );
  };

  return (
    <Fragment>
      {status === "error" && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table
        className={
          status === "success" ? "bookingsGrid active" : "bookingsGrid"
        }
      >
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner />
              </span>
            </th>
            {dates.map((d) => (
              <th key={d}>{new Date(d).toDateString()}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}
