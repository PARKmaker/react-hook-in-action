import { ChangeEvent, useEffect } from "react";
import Spinner from "../UI/Spinner.tsx";
import { useUser } from "../../hooks/useUser.tsx";
import useFetch from "../../hooks/useFetch.tsx";

export default function UserPicker() {
  const { user, setUser } = useUser();

  const { data: users = [], status } = useFetch("http://localhost:3001/users");

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users?.find((u) => u.id === selectedID);

    if (selectedUser) {
      setUser(selectedUser);
    }
  };
  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <span>Error!</span>;
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
