import UsersList from "./UsersList.tsx";
import { useContext, useState } from "react";
import UserDetail from "./UserDetail.tsx";
import { TUser } from "./type.ts";
import UserContext from "./UserContext.tsx";

export default function UsersPage() {
  const [user, setUser] = useState<TUser | null>(null);
  const loggedInUser = useContext(UserContext);
  const currentUser = user || loggedInUser;

  console.log("loggedInUser", loggedInUser);
  console.log("user", user);
  console.log("currentUser", currentUser);
  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetail user={currentUser} />
    </main>
  );
}
``;
