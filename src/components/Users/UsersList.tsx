import React, { Fragment } from "react";
import Spinner from "../UI/Spinner.tsx";
import { TUser } from "../../Types/userType.ts";
import useFetch from "../../hooks/useFetch.tsx";

type Props = {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

export default function UsersList({ user, setUser }: Props) {
  const {
    data: users = [],
    status,
    error,
  } = useFetch("http://localhost:3001/users");

  // alternative UI for when there's an error
  if (status === "error") {
    if (error instanceof Error) {
      return <p>{error.message}</p>;
    }

    return <p>Error</p>;
  }

  // alternative UI while users load
  if (status === "loading") {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users &&
          users.map((u) => (
            <li
              key={u.id}
              className={u.id === user?.id ? "selected" : undefined}
            >
              <button className="btn" onClick={() => setUser(u)}>
                {u.name}
              </button>
            </li>
          ))}
      </ul>
    </Fragment>
  );
}
