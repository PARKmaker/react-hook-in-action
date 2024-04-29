export type TBooking = {
  session: string;
  date: string;
  bookableId: number;
  title: string;
  notes?: string;
  bookerId?: string;
};

export type TBookings = {
  [session: string]: {
    [date: string]: TBooking;
  };
};
