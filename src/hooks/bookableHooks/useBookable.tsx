import { useQuery, useQueryClient } from "@tanstack/react-query";
import getData from "../../utils/api.ts";
import { TBookable } from "../../Types/bookableType.ts";

export function useBookable(id: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["bookable", id],
    queryFn: () => getData(`http://localhost:3001/bookables/${id}`),
    refetchOnWindowFocus: false,
    initialData: () =>
      queryClient
        .getQueryData<TBookable[]>(["bookables"])
        ?.find((b) => b.id === parseInt(id, 10)),
  });
}
