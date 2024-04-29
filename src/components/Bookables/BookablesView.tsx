import { Fragment, useState } from "react";
import { TBookable } from "./types.ts";
import BookablesList from "./BookablesList.tsx";
import BookableDetails from "./BookableDetails.tsx";

export default function BookablesPage() {
  const [bookable, setBookable] = useState<TBookable>();

  return (
    <Fragment>
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
}
