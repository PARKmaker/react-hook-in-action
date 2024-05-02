import { shortISO } from "../../utils/date-wrangler.ts";
import useFetch from "../useFetch.tsx";
import { transformBookings } from "../../components/Bookings/grid-builder.ts";
import { TBooking } from "../../Types/bookingType.ts";

export function useBookings(
  bookableId: number | undefined,
  startDate: Date,
  endDate: Date,
) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const queryString = `bookableId=${bookableId}` + `&date=${start}&date=${end}`;

  const query = useFetch(`${urlRoot}?${queryString}`);

  return {
    bookings: query.data
      ? transformBookings(query.data as unknown as TBooking[])
      : {},
    ...query,
  };
}
