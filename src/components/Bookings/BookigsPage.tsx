import BookablesList from "../Bookables/BookablesList.tsx";
import { useState } from "react";
import { TBookable } from "../Bookables/types.ts";
import Bookings from "./Bookings.tsx";

export default function BookingsPage() {
  const [bookable, setBookable] = useState<TBookable>();
  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  );
}
