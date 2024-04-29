import {
  Fragment,
  ChangeEvent,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { FaArrowRight } from "react-icons/fa";
import { TBookable } from "./types.ts";
import getData from "../../utils/api.ts";
import Spinner from "../UI/Spinner.tsx";

type Props = {
  bookable: TBookable | undefined;
  setBookable: Dispatch<SetStateAction<TBookable | undefined>>;
};

export default function BookablesList({ bookable, setBookable }: Props) {
  const [bookables, setBookables] = useState<TBookable[]>([]);
  const [error, setError] = useState<boolean | Error>(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;

  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  // const timerRef = useRef<number | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);

  const changeGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === event.target.value,
    );

    setBookable(bookablesInSelectedGroup[0]);
  };

  const nextBookable = () => {
    if (!bookable) {
      return;
    }

    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
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
    <div>
      <select value={group} onChange={(e) => changeGroup(e)}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>

      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b) => (
          <li
            key={b.id}
            className={b.id === bookable?.id ? "selected" : undefined}
          >
            <button className="btn" onClick={() => setBookable(b)}>
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
  );
}
