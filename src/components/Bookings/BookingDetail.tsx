import { TBookable } from "../../Types/bookableType.ts";
import { TBooking } from "../../Types/bookingType.ts";
import Booking from "./Booking.tsx";
import { FaEdit } from "react-icons/fa";
import { useUser } from "../../hooks/useUser.tsx";
import { useEffect, useState } from "react";
import {
  useBookingParams,
  useCreateBooking,
  useDeleteBooking,
  useUpdateBooking,
} from "../../hooks/bookingsHooks";
import { getWeek, shortISO } from "../../utils/date-wrangler.ts";
import BookingForm from "./BookingForm.tsx";

type Props = {
  booking: TBooking | null;
  bookable: TBookable;
};
export default function BookingDetails({ booking, bookable }: Props) {
  const [isEditing, setIsEditing] = useState<boolean | null>(false);

  const { date } = useBookingParams();
  const week = getWeek(date);
  const key: string[] = [
    "bookings",
    String(bookable.id),
    shortISO(week.start),
    shortISO(week.end),
  ];

  const { user } = useUser();
  const isBooker = booking && user && booking.bookerId === user.id;

  const { createBooking, isCreating } = useCreateBooking(key);
  const { updateBooking, isUpdating } = useUpdateBooking(key);
  const { deleteBooking, isDeleting } = useDeleteBooking(key);

  useEffect(() => {
    setIsEditing(booking && booking.id === undefined);
  }, [booking]);

  function handleSave(item: TBooking) {
    setIsEditing(false);
    if (item.id === undefined) {
      createBooking({ ...item, bookerId: user?.id });
    } else {
      updateBooking(item);
    }
  }

  function handleDelete(item: TBooking) {
    if (window.confirm("Are you sure you want to delete the booking?")) {
      setIsEditing(false);
      deleteBooking(item.id);
    }
  }

  return (
    <div className="booking-details">
      <h2>
        Booking Details
        {isBooker && (
          <span className="controls">
            <button className="btn" onClick={() => setIsEditing((v) => !v)}>
              <FaEdit />
            </button>
          </span>
        )}
      </h2>

      {isCreating || isUpdating || isDeleting ? (
        <div className="booking-details-fields">
          <p>Saving...</p>
        </div>
      ) : isEditing ? (
        <BookingForm
          booking={booking}
          bookable={bookable}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ) : booking ? (
        <Booking booking={booking} bookable={bookable} />
      ) : (
        <div className="booking-details-fields">
          <p>Select a booking or a booking slot.</p>
        </div>
      )}
    </div>
  );
}
