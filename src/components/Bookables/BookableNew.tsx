import { useNavigate } from "react-router-dom";
import useFormState from "../../hooks/useFormState.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem } from "../../utils/api.ts";
import { TBookable } from "../../Types/bookableType.ts";
import PageSpinner from "../UI/PageSpinner.tsx";
import BookableForm from "./BookableForm.tsx";

export default function BookableNew() {
  const navigate = useNavigate();
  const formState = useFormState({});
  const queryClient = useQueryClient();

  const {
    mutate: createBookable,
    status,
    error,
  } = useMutation({
    mutationFn: (item) => createItem("http://localhost:3001/bookables", item),
    onSuccess: (bookable: TBookable) => {
      queryClient.setQueryData(["bookables"], (old) => [
        ...((old as []) || []),
        bookable,
      ]);
      navigate(`/bookables/${bookable.id}`);
    },
  });

  const handleSubmit = () => {
    createBookable(formState.state);
  };

  if (status === "error") {
    return <p>{error.message}</p>;
  }

  if (status === "pending") {
    return <PageSpinner />;
  }

  return <BookableForm formState={formState} handleSubmit={handleSubmit} />;
}
