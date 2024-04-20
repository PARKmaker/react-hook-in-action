import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner.tsx";
import { TUsers } from "./type.ts";

export default function UserPicker() {
  const [users, setUsers] = useState<TUsers[] | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const resp = await fetch("http://localhost:3001/users");
      const data = await resp.json();

      setUsers(data);
    };

    getUsers();
  }, []);

  if (users === null) {
    return <Spinner />;
  }

  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}
