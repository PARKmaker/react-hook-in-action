export type TBooking = {
  session: string;
  date: string;
  bookableId: number;
  title: string;
  notes: string;
  bookerId?: number | string;
  id: number;
};

export type TBookings = {
  [session: string]: {
    [date: string]: TBooking;
  };
};
