import { ChangeEvent, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { TBookable } from "../../Types/bookableType.ts";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  bookable: TBookable | undefined;
  // setBookable: Dispatch<SetStateAction<TBookable | undefined>>;
  bookables: [] | TBookable[];
  getUrl: (id: number) => string;
};

export default function BookablesList({ bookable, bookables, getUrl }: Props) {
  const group = bookable?.group;
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const changeGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === event.target.value,
    );

    navigate(getUrl(bookablesInSelectedGroup[0].id));
  };

  const nextBookable = () => {
    if (!bookable) {
      return;
    }

    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];

    navigate(getUrl(nextBookable.id));
  };

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
            <Link to={getUrl(b.id)} className={"btn"} replace={true}>
              {b.title}
            </Link>
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
