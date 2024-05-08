import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../../utils/api.ts";
import { TBookable } from "../../Types/bookableType.ts";

export function useDeleteBookable() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (bookable: TBookable) =>
      deleteItem(`http://localhost:3001/bookables/${bookable.id}`),
    onSuccess: (_, bookable) => {
      // get all the bookables from the cache
      const bookables =
        queryClient.getQueryData<TBookable[]>(["bookables"]) || [];

      // set the bookables cache without the deleted one
      queryClient.setQueryData(
        ["bookables"],
        bookables.filter((b) => b.id !== bookable.id),
      );

      // If there are other bookables in the same group as the deleted one,
      // navigate to the first
      navigate(`/bookables/${getIdForFirstInGroup(bookables, bookable) || ""}`);
    },
  });

  return {
    deleteBookable: mutation.mutate,
    isDeleting: mutation.isPending,
    isDeleteError: mutation.isError,
    deleteError: mutation.error,
  };
}

function getIdForFirstInGroup(
  bookables: TBookable[],
  excludedBookable: TBookable,
) {
  // get the id and group of the deleted bookable
  const { id, group } = excludedBookable;

  // find the first other bookable in the same group as the deleted one
  const bookableInGroup = bookables.find(
    (b) => b.group === group && b.id !== id,
  );

  // return its id or undefined
  return bookableInGroup?.id;
}
