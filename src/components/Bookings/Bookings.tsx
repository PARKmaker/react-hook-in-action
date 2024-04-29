import { TBookable } from "../Bookables/types.ts";
import { useReducer, useState } from "react";
import weekReducer from "./weekReducer.ts";
import { getWeek } from "../../utils/date-wrangler.ts";
import WeekPicker from "./WeekPicker.tsx";
import BookingsGrid from "./BookingsGrid.tsx";
import BookingDetail from "./BookingDetail.tsx";
import { TBooking } from "./types.ts";

export default function Bookings({
  bookable,
}: {
  bookable: TBookable | undefined;
}) {
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);

  const [booking, setBooking] = useState<TBooking | null>(null);

  return (
    <div className={"bookings"}>
      <div>
        <WeekPicker dispatch={dispatch} />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <BookingDetail booking={booking} bookable={bookable as TBookable} />
    </div>
  );
}
