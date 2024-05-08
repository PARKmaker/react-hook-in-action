import { Fragment } from "react";
import BookablesList from "./BookablesList.tsx";
import BookableDetails from "./BookableDetails.tsx";
import { Link, useParams } from "react-router-dom";
import PageSpinner from "../UI/PageSpinner.tsx";
import { TBookable } from "../../Types/bookableType.ts";
import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import getData from "../../utils/api.ts";

export default function BookablesPage() {
  const {
    data: bookables = [],
    isError,
    isPending,
    error,
  } = useQuery<TBookable[]>({
    queryKey: ["bookables"],
    queryFn: () => getData("http://localhost:3001/bookables"),
  });

  const { id } = useParams();

  const bookable =
    bookables.find((b) => id && b.id === parseInt(id, 10)) || bookables[0];

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (isPending) {
    return <PageSpinner />;
  }

  return (
    <main className={"bookables-page"}>
      <div>
        <BookablesList
          bookable={bookable as TBookable}
          bookables={bookables as TBookable[] | []}
          getUrl={(id: number) => `/bookables/${id}`}
        />
        <p className={"controls"}>
          <Link to={"/bookables/new"} replace={true} className={"btn"}>
            <FaPlus />
            <span>New</span>
          </Link>
        </p>
      </div>
      <BookableDetails bookable={bookable as TBookable} />
    </main>
  );
}
