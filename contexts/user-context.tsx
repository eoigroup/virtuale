// app/context/UserContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IUser } from "@/types/user";
import { toast } from "sonner";
import { getUser } from "@/lib/api/user";

interface UserContextProps {
  user: IUser | null;
  loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getSessionUser = async () => {
    try {
      const response = await getUser();
      setUser(response.data.user);
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.message || "Error loading user");
    }
  };

  useEffect(() => {
    getSessionUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
