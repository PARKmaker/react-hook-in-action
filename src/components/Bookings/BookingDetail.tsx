import { TBookable } from "../../Types/bookableType.ts";
import { TBooking } from "../../Types/bookingType.ts";
import Booking from "./Booking.tsx";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../../hooks/useUser.tsx";

type Props = {
  booking: TBooking | null;
  bookable: TBookable;
};
export default function BookingDetail({ booking, bookable }: Props) {
  const { user } = useUser();

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
