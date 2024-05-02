import { TBookable } from "../../Types/bookableType.ts";
import { useEffect, useState } from "react";
import { getWeek, shortISO } from "../../utils/date-wrangler.ts";
import WeekPicker from "./WeekPicker.tsx";
import BookingsGrid from "./BookingsGrid.tsx";
import BookingDetail from "./BookingDetail.tsx";
import { TBooking } from "../../Types/bookingType.ts";
import { useBookingParams } from "../../hooks/bookingsHooks/useBookingParams.tsx";
import { useBookings } from "../../hooks/bookingsHooks";

export default function Bookings({
  bookable,
}: {
  bookable: TBookable | undefined;
}) {
  // const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);

  const [booking, setBooking] = useState<TBooking | null>(null);

  const { date } = useBookingParams();
  const week = getWeek(date);
  const weekStart = shortISO(week.start);

  const { bookings } = useBookings(bookable?.id, week.start, week.end);

  const selectedBooking =
    bookings?.[(booking as TBooking)?.session]?.[(booking as TBooking)?.date];

  useEffect(() => {
    setBooking(null);
  }, [bookable, weekStart]);

  return (
    <div className={"bookings"}>
      <div>
        <WeekPicker />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <BookingDetail
        booking={selectedBooking || booking}
        bookable={bookable as TBookable}
      />
    </div>
  );
}
