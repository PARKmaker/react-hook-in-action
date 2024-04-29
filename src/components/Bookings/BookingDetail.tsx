import { TBookable } from "../Bookables/types.ts";
import { TBooking } from "./types.ts";
import Booking from "./Booking.tsx";
import { useContext } from "react";
import UserContext from "../Users/UserContext.tsx";
import { FaEdit } from "react-icons/fa";

type Props = {
  booking: TBooking | null;
  bookable: TBookable;
};
export default function BookingDetail({ booking, bookable }: Props) {
  const user = useContext(UserContext);

  const isBooker = booking && user && booking.bookerId === user.id;

  return (
    <div className={"booking-details placeholder"}>
      <h2>
        Booking Details
        {isBooker && (
          <span className={"controls"}>
            <button className={"btn"}>
              <FaEdit />
            </button>
          </span>
        )}
      </h2>

      {booking ? (
        <Booking booking={booking} bookable={bookable} />
      ) : (
        <div className={"booking-details-fields"}>
          <p>Select a booking or a booking slot.</p>
        </div>
      )}
    </div>
  );
}
