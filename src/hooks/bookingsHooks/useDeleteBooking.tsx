import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../../utils/api.ts";
import { TBooking } from "../../Types/bookingType.ts";

export function useDeleteBooking(key: string[]) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) =>
      deleteItem(`http://localhost:3001/bookings/${id}`),
    onSuccess: (_resp, id) => {
      queryClient.invalidateQueries({ queryKey: key });
      const bookings = queryClient.getQueryData<TBooking[]>(key) || [];
      queryClient.setQueryData(
        key,
        bookings.filter((b) => b.id !== id),
      );
    },
  });

  return {
    deleteBooking: mutation.mutate,
    isDeleting: mutation.isPending,
  };
}
