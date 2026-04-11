import { createContext } from "react";
import type { UserContextType } from "../components/types";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
