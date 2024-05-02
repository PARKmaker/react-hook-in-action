import { useContext } from "react";
import UserContext, {
  UserSetContext,
} from "../components/Users/UserContext.tsx";

export function useUser() {
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  if (!setUser) {
    throw new Error("The UserProvider is missing.");
  }

  return { user, setUser };
}
