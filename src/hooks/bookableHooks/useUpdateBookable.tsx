import { useNavigate } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { editItem } from "../../utils/api.ts";
import { TBookable } from "../../Types/bookableType.ts";

export function useUpdateBookable() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (item: TBookable) =>
      editItem(`http://localhost:3001/bookables/${item.id}`, item),

    onSuccess: (bookable: TBookable) => {
      updateBookablesCache(bookable, queryClient);

      queryClient.setQueryData(["bookable", String(bookable.id)], bookable);

      navigate(`/bookables/${bookable.id}`);
    },
  });

  return {
    updateBookable: mutation.mutate,
    isUpdating: mutation.isPending,
    isUpdateError: mutation.isError,
    updateError: mutation.error,
  };
}

function updateBookablesCache(bookable: TBookable, queryClient: QueryClient) {
  const bookables = queryClient.getQueryData<TBookable[]>(["bookables"]) || [];

  const bookableIndex = bookables.findIndex((b) => b.id === bookable.id);

  if (bookableIndex !== -1) {
    bookables[bookableIndex] = bookable;
    queryClient.setQueryData(["bookables"], bookables);
  }
}
