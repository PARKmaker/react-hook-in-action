import { useMemo } from "react";
import getGrid from "../../components/Bookings/grid-builder.ts";
import { TBookable } from "../../Types/bookableType.ts";

export function useGrid(bookable: TBookable | undefined, startDate: Date) {
  return useMemo(
    () =>
      bookable
        ? getGrid(bookable, startDate)
        : { grid: null, sessions: null, dates: null },
    [bookable, startDate],
  );
}
