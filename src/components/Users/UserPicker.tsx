import { ChangeEvent, useContext, useEffect, useState } from "react";
import Spinner from "../UI/Spinner.tsx";
import { TUser } from "./type.ts";
import UserContext, { UserSetContext } from "./UserContext.tsx";

export default function UserPicker() {
  const [users, setUsers] = useState<TUser[] | null>(null);

  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  useEffect(() => {
    const getUsers = async () => {
      const resp = await fetch("http://localhost:3001/users");
      const data = await resp.json();

      setUsers(data);
      setUser(data[0]);
    };

    getUsers();
  }, [setUser]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users?.find((u) => u.id === selectedID);

    if (selectedUser) {
      setUser(selectedUser);
    }
  };

  if (users === null) {
    return <Spinner />;
  }

  return (
    <select className={"user-picker"} onChange={handleSelect} value={user?.id}>
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  );
}
