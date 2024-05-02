import BookablesList from "../Bookables/BookablesList.tsx";
import Bookings from "./Bookings.tsx";
import { useBookingParams } from "../../hooks/bookingsHooks/useBookingParams.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import { shortISO } from "../../utils/date-wrangler.ts";
import PageSpinner from "../UI/PageSpinner.tsx";

export default function BookingsPage() {
  const {
    data: bookables = [],
    status,
    error,
  } = useFetch("http://localhost:3001/bookables");

  const { date, bookableId } = useBookingParams();

  const bookable = bookables.find((b) => b.id === bookableId) || bookables[0];

  function getUrl(id: number) {
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  }

  if (status === "error") {
    if (error instanceof Error) {
      return <p>{error?.message}</p>;
    }
    return <p>Error</p>;
  }

  if (status === "loading") {
    return <PageSpinner />;
  }

  return (
    <main className="bookings-page">
      <BookablesList
        bookable={bookable}
        bookables={bookables}
        getUrl={getUrl}
      />
      <Bookings bookable={bookable} />
    </main>
  );
}
