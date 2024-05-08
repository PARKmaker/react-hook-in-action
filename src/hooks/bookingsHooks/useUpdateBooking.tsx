import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editItem } from "../../utils/api.ts";
import type { TBooking } from "../../Types/bookingType.ts";

export function useUpdateBooking(key: string[]) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (item: TBooking) =>
      editItem(`http://localhost:3001/bookings/${item.id}`, item),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: key });
      const bookings = queryClient.getQueryData<TBooking[]>(key) || [];
      const bookingIndex = bookings.findIndex((b) => b.id === booking.id);
      bookings[bookingIndex] = booking;
      queryClient.setQueryData(key, bookings);
    },
  });

  return {
    updateBooking: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}
