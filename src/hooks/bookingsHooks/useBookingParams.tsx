import { useSearchParams } from "react-router-dom";
import { isDate } from "../../utils/date-wrangler.ts";

export function useBookingParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchDate = searchParams.get("date");
  const bookableId = searchParams.get("bookableId");

  const date =
    searchDate && isDate(searchDate) ? new Date(searchDate) : new Date();
  const idInt = parseInt(bookableId as string, 10);
  const hasId = !isNaN(idInt);

  const setBookingsDate = (date: string) => {
    // const params: Record<string, string> = {};
    const params: { [key: string]: string } = {};

    if (hasId) {
      params.bookableId = bookableId || "";
    }

    if (isDate(date)) {
      params.date = date;
    }

    if (params.date || params.bookableId !== "" || null || undefined) {
      setSearchParams(params, { replace: true });
    }
  };

  return {
    date,
    bookableId: hasId ? idInt : undefined,
    setBookingsDate,
  };
}
