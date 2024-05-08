import { animated } from "react-spring";

import BookingsGrid from "./BookingsGrid";
import { useSlide } from "../../hooks/bookingsHooks";

import { TDateState } from "./reducer/weekReducer.ts";
import { TBookable } from "../../Types/bookableType.ts";
import { TBooking } from "../../Types/bookingType.ts";
import { Dispatch, SetStateAction } from "react";

type Props = {
  week: TDateState;
  bookable: TBookable | undefined;
  booking: TBooking | null;
  setBooking: Dispatch<SetStateAction<TBooking | null>>;
};
export default function BookingsGridSlide(props: Props) {
  const { week, bookable, booking, setBooking } = props;

  const transitions = useSlide(bookable as TBookable, week);

  return (
    <div className="grid-wrapper">
      {transitions.map(({ item, props, key }) => (
        <animated.div className="grid" style={{ ...props }} key={key}>
          <BookingsGrid
            week={item.week}
            bookable={item.bookable}
            booking={booking}
            setBooking={setBooking}
          />
        </animated.div>
      ))}
    </div>
  );
}
