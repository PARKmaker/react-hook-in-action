import { ChangeEvent } from "react";
import { FaArrowRight } from "react-icons/fa";
import { TBookable } from "../../Types/bookableType.ts";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  bookable: TBookable;
  // setBookable: Dispatch<SetStateAction<TBookable | undefined>>;
  bookables: [] | TBookable[];
  getUrl: (id: number) => string;
};

export default function BookablesList({ bookable, bookables, getUrl }: Props) {
  const group = bookable?.group;
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  const navigate = useNavigate();

  function changeGroup(event: ChangeEvent<HTMLSelectElement>) {
    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === event.target.value,
    );
    navigate(getUrl(bookablesInSelectedGroup[0].id));
  }

  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    navigate(getUrl(nextBookable.id));
  }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
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
            className={b.id === bookable.id ? "selected" : undefined}
          >
            <Link to={getUrl(b.id)} className="btn" replace={true}>
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <button className="btn" onClick={nextBookable} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
