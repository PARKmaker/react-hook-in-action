import React, { useState, Fragment, useEffect } from "react";
import getData from "../../utils/api.ts";
import Spinner from "../UI/Spinner.tsx";
import { TUser } from "./type.ts";

type Props = {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

export default function UsersList({ user, setUser }: Props) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<TUser[] | null>(null);

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((data) => {
        // setUser(data[0]);
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setUser]);

  // alternative UI for when there's an error
  if (error) {
    return <p>{error.message}</p>;
  }

  // alternative UI while users load
  if (isLoading) {
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
