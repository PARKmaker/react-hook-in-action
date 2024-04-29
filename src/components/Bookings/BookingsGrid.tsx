import { TBookable } from "../Bookables/types.ts";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import getGrid, { transformBookings } from "./grid-builder.ts";
import { TDateState } from "./weekReducer.ts";
import { getBookings } from "../../utils/api.ts";
import Spinner from "../UI/Spinner.tsx";
import { TBooking, TBookings } from "./types.ts";

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
  // 1. 변수
  const [bookings, setBookings] = useState<TBookings | null>(null);
  const [error, setError] = useState(false);

  // const { grid, dates, sessions } = useMemo(
  //   () => (bookable ? getGrid(bookable, week.start) : {}),
  //   [bookable, week.start],
  // );

  const { grid, dates, sessions } = useMemo(
    () =>
      bookable
        ? getGrid(bookable, week.start)
        : { grid: null, sessions: null, dates: null },
    [bookable, week.start],
  );

  // 2. 효과
  useEffect(() => {
    if (bookable) {
      let doUpdate = true;

      setBookings(null);
      setError(false);
      setBooking(null);

      getBookings(bookable.id, week.start, week.end)
        .then((resp) => {
          if (doUpdate) {
            console.log(resp);
            setBookings(transformBookings(resp));
          }
        })
        .catch(setError);

      return () => {
        doUpdate = false;
      };
    }
  }, [week, bookable, setBooking]);

  if (!grid) {
    return <p>Loading...</p>;
  }

  // 3. UI 도우미
  const cell = (session: string, date: string) => {
    const cellData = bookings?.[session]?.[date] || grid[session][date];

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : undefined}
        onClick={bookings ? () => setBooking(cellData) : undefined}
      >
        {cellData.title}
      </td>
    );
  };

  return (
    <Fragment>
      {error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data (${error})`}
        </p>
      )}
      <table className={bookings ? "bookingsGrid active" : "bookingsGrid"}>
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
