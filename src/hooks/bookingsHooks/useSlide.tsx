import { TBookable } from "../../Types/bookableType.ts";
import { TDateState } from "../../components/Bookings/reducer/weekReducer.ts";
import { shortISO } from "../../utils/date-wrangler.ts";
import { useEffect, useRef } from "react";
import { useTransition } from "react-spring";

export function useSlide(bookable: TBookable, week: TDateState) {
  const weekStart = shortISO(week.start);
  const weekRef = useRef(weekStart);

  useEffect(() => {
    weekRef.current = weekStart;
  }, [weekStart]);

  return useTransition(
    { bookable, week },
    (item) => `${item.bookable.id}_${shortISO(item.week.start)}`,
    getSlideStyles(weekRef.current, weekStart),
  );
}

function getSlideStyles(date1: string, date2: string) {
  // vertical transition
  if (date1 === date2) {
    return {
      from: { opacity: 1, transform: "translate3d(0, -100%, 0)" },
      enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
      leave: { opacity: 0, transform: "translate3d(0, 20%, 0)" },
    };
  }

  // horizontal transition
  const percent = date1 < date2 ? 100 : -100;
  return {
    from: { opacity: 1, transform: `translate3d(${percent}%, 0, 0)` },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: `translate3d(${-percent}%, 0, 0)` },
  };
}
