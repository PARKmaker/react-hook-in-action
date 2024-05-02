import { Fragment } from "react";
import BookablesList from "./BookablesList.tsx";
import BookableDetails from "./BookableDetails.tsx";
import useFetch from "../../hooks/useFetch.tsx";
import { Link, useParams } from "react-router-dom";
import PageSpinner from "../UI/PageSpinner.tsx";
import { TBookable } from "../../Types/bookableType.ts";
import { FaPlus } from "react-icons/fa";

export default function BookablesPage() {
  const {
    data: bookables = [],
    status,
    error,
  } = useFetch("http://localhost:3001/bookables");

  const { id } = useParams();

  const bookable =
    bookables.find((b) => id && b.id === parseInt(id, 10)) || bookables[0];

  if (status === "error" && error instanceof Error) {
    return <p>{error.message}</p>;
  }

  if (status === "loading") {
    return <PageSpinner />;
  }

  return (
    <main className={"bookables-page"}>
      <div>
        <BookablesList
          bookable={bookable}
          bookables={bookables as TBookable[] | []}
          getUrl={(id: string) => `/bookables/${id}`}
        />
        <p className={"controls"}>
          <Link to={"/bookables/new"} replace={true} className={"btn"}>
            <FaPlus />
            <span>New</span>
          </Link>
        </p>
      </div>
      <BookableDetails bookable={bookable} />
    </main>
  );
}
