import React, { createContext, ReactNode, useContext, useState } from "react";
import { TUser } from "../components/Users/type.ts";

const UserContext = createContext<TUser | null>(null);
const UserSetContext = createContext<
  React.Dispatch<React.SetStateAction<TUser | null>>
>(() => {});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);

  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  if (!setUser) {
    throw new Error("The UserProvider is missing.");
  }

  return [user, setUser];
}
