import { TBookable } from "../../Types/bookableType.ts";
import { addDays, shortISO } from "../../utils/date-wrangler.ts";
import { sessions as sessionNames } from "../../static.json";
import { TBooking, TBookings } from "../../Types/bookingType.ts";

export default function getGrid(bookable: TBookable, startDate: Date) {
  const dates = bookable.days
    .sort()
    .map((d) => shortISO(addDays(startDate, d)));

  const sessions = bookable.sessions.map((i) => sessionNames[i]);

  const grid: TBookings = {};

  sessions.forEach((session) => {
    grid[session] = {};
    dates.forEach(
      (date) =>
        (grid[session][date] = {
          session,
          date,
          title: "",
          bookableId: bookable.id,
        }),
    );
  });

  return {
    grid,
    dates,
    sessions,
  };
}

export function transformBookings(bookingsArray: TBooking[]) {
  return bookingsArray.reduce((bookings: TBookings, booking) => {
    const { session, date } = booking;

    if (!bookings[session]) {
      bookings[session] = {};
    }

    bookings[session][date] = booking;

    return bookings;
  }, {});
}
