import UsersList from "./UsersList.tsx";
import { useState } from "react";
import UserDetail from "./UserDetail.tsx";
import { TUser } from "../../Types/userType.ts";
import { useUser } from "../../hooks/useUser.tsx";

export default function UsersPage() {
  const [user, setUser] = useState<TUser | null>(null);
  const { user: loggedInUser } = useUser();
  const currentUser = user || loggedInUser;

  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetail user={currentUser} />
    </main>
  );
}
``;
