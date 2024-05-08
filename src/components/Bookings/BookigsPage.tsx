import BookablesList from "../Bookables/BookablesList.tsx";
import Bookings from "./Bookings.tsx";
import { useBookingParams } from "../../hooks/bookingsHooks/useBookingParams.tsx";
import { shortISO } from "../../utils/date-wrangler.ts";
import PageSpinner from "../UI/PageSpinner.tsx";
import { TBookable } from "../../Types/bookableType.ts";
import { useQuery } from "@tanstack/react-query";
import getData from "../../utils/api.ts";

export default function BookingsPage() {
  const {
    data: bookables = [],
    isError,
    isPending,
    error,
  } = useQuery<TBookable[]>({
    queryKey: ["bookables"],
    queryFn: () => getData("http://localhost:3001/bookables"),
  });

  const { date, bookableId } = useBookingParams();

  const bookable = bookables.find((b) => b.id === bookableId) || bookables[0];

  function getUrl(id: number) {
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  if (isPending) {
    return <PageSpinner />;
  }

  return (
    <main className="bookings-page">
      <BookablesList
        bookable={bookable as TBookable}
        bookables={bookables as TBookable[]}
        getUrl={getUrl}
      />
      <Bookings bookable={bookable as TBookable} />
    </main>
  );
}
