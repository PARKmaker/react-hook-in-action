import { useState, Fragment, useEffect } from "react";
import getData from "../../utils/api.ts";
import Spinner from "../UI/Spinner.tsx";
import { TUsers } from "./type.ts";

export default function UsersList() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState<TUsers[] | null>(null);
  const [userIndex, setUserIndex] = useState(0);
  const user = users?.[userIndex];

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

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
          users.map((u, i) => (
            <li key={u.id} className={i === userIndex ? "selected" : undefined}>
              <button className="btn" onClick={() => setUserIndex(i)}>
                {u.name}
              </button>
            </li>
          ))}
      </ul>

      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}
