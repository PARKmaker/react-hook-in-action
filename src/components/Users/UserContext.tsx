import React, { createContext, ReactNode, useState } from "react";
import { TUser } from "./type.ts";

// type UserContextType = {
//   user: TUser | null;
//   setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
// };
//
// const initUserContextState = {
//   user: null,
//   setUser: () => {},
// };
//
// const UserContext = createContext<UserContextType>(initUserContextState);

const UserContext = createContext<TUser | null>(null);

export const UserSetContext = createContext<
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

export default UserContext;
