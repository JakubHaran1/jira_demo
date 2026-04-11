import { type ReactNode, useState } from "react";
import type { UserType } from "../components/types";
import { UserContext } from "../context/UserContext";

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
