// app/context/PersonaContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { getAllPersonas, getUserConvos } from "@/lib/api/persona";
import { IPersona, IUserConvos } from "@/types/persona";

interface PersonaContextProps {
  personas: IPersona[];
  userConvos: IUserConvos[];
  loading: boolean;
  updatePersonas: () => Promise<void>;
}

const PersonaContext = createContext<PersonaContextProps>({
  personas: [],
  userConvos: [],
  loading: false,
  updatePersonas: async () => {},
});

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [personas, setPersonas] = useState<IPersona[]>([]);
  const [userConvos, setUserConvos] = useState<IUserConvos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const updatePersonas = async () => {
    setLoading(true);
    try {
      const response = await Promise.all([getAllPersonas(), getUserConvos()]);

      setPersonas(response[0].data);
      setUserConvos(
        response[1].data.sort((a: IUserConvos, b: IUserConvos) =>
          a.timestamp.localeCompare(b.timestamp)
        )
      );
    } catch (error: any) {
      toast.error(error?.message || "Error loading persona templates");
    }
    setLoading(false);
  };

  useEffect(() => {
    updatePersonas();
  }, []);

  return (
    <PersonaContext.Provider
      value={{ personas, userConvos, updatePersonas, loading }}
    >
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return context;
};
