import BookableForm from "./BookableForm.tsx";
import { useParams } from "react-router-dom";
import PageSpinner from "../UI/PageSpinner.tsx";
import useFormState from "../../hooks/useFormState.tsx";
import {
  useBookable,
  useDeleteBookable,
  useUpdateBookable,
} from "../../hooks/bookableHooks";

export default function BookableEdit() {
  const { id } = useParams();

  const { data, isLoading } = useBookable(id as string);
  const formState = useFormState(data);

  const { updateBookable, isUpdating, isUpdateError, updateError } =
    useUpdateBookable();

  const { deleteBookable, isDeleting, isDeleteError, deleteError } =
    useDeleteBookable();

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete the bookable?")) {
      // call the mutation function for deleting the bookable
      deleteBookable(formState.state);
    }
  }

  function handleSubmit() {
    // call the mutation function for updating the bookable
    updateBookable(formState.state);
  }

  if (isUpdateError || isDeleteError) {
    return <p>{updateError?.message || deleteError?.message}</p>;
  }

  if (isLoading || isUpdating || isDeleting) {
    return <PageSpinner />;
  }

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  );
}
