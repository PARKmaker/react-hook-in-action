import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem } from "../../utils/api.ts";
import { TBooking } from "../../Types/bookingType.ts";

export function useCreateBooking(key: string[]) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (item: TBooking) =>
      createItem("http://localhost:3001/bookings", item),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: key });
      const bookings = queryClient.getQueryData<TBooking[]>(key) || [];
      queryClient.setQueryData(key, [...bookings, booking]);
    },
  });

  return {
    createBooking: mutation.mutate,
    isCreating: mutation.isPending,
  };
}
