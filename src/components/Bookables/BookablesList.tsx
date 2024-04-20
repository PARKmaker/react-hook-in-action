import {
  Fragment,
  ChangeEvent,
  useReducer,
  useEffect,
  useRef,
  Dispatch,
} from "react";
import { sessions, days } from "../../static.json";
import { FaArrowRight } from "react-icons/fa";
import { TAction, TState } from "./Types.ts";
import bookablesListReducer from "./bookablesListReducer.ts";
import {
  FETCH_BOOKABLES_ERROR,
  FETCH_BOOKABLES_REQUEST,
  FETCH_BOOKABLES_SUCCESS,
  NEXT_BOOKABLE,
  SET_BOOKABLE,
  SET_GROUP,
  TOGGLE_HAS_DETAILS,
} from "./bookablesListReducerActions.ts";
import getData from "../../utils/api.ts";
import Spinner from "../UI/Spinner.tsx";

const initialState: TState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
};

type Props = {
  state: TState;
  dispatch: Dispatch<TAction>;
};

export default function BookablesList({ state, dispatch }: Props) {
  const { group, bookableIndex, bookables } = state;
  const { isLoading, error } = state;

  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  // const timerRef = useRef<number | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch({ type: FETCH_BOOKABLES_REQUEST });
    getData("http://localhost:3001/bookables")
      .then((bookables) =>
        dispatch({
          type: FETCH_BOOKABLES_SUCCESS,
          payload: bookables,
        }),
      )
      .catch((error) =>
        dispatch({ type: FETCH_BOOKABLES_ERROR, payload: error }),
      );
  }, [dispatch]);

  const changeGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: SET_GROUP,
      payload: event.target.value,
    });
  };

  const changeBookable = (selectedIndex: number) => {
    dispatch({
      type: SET_BOOKABLE,
      payload: selectedIndex,
    });

    if (nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  };

  const toggleDetails = () => {
    dispatch({ type: TOGGLE_HAS_DETAILS });
  };

  const nextBookable = () => {
    dispatch({
      type: NEXT_BOOKABLE,
    });
  };

  if (error && error instanceof Error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading bookables...
      </p>
    );
  }

  return (
    <Fragment>
      <div>
        <select value={group} onChange={(e) => changeGroup(e)}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>

        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li
              key={b.id}
              className={i === bookableIndex ? "selected" : undefined}
            >
              <button className="btn" onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button
            className="btn"
            onClick={nextBookable}
            autoFocus
            ref={nextButtonRef}
          >
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
    </Fragment>
  );
}
