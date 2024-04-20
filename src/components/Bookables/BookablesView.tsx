import { Fragment, useReducer } from "react";
import bookablesListReducer from "./bookablesListReducer.ts";
import { TState } from "./Types.ts";
import BookablesList from "./BookablesList.tsx";
import BookableDetails from "./BookableDetails.tsx";

const initialState: TState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
};

export default function BookablesView() {
  const [state, dispatch] = useReducer(bookablesListReducer, initialState);

  const bookablesInGroup = state.bookables.filter(
    (b) => b.group === state.group,
  );
  const bookable = bookablesInGroup[state.bookableIndex];

  return (
    <Fragment>
      <BookablesList state={state} dispatch={dispatch} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
}
