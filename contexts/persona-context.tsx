// app/context/PersonaContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";
import { getUserConvos } from "@/lib/api/persona";
import { IPersona, IUserConvos } from "@/types/persona";

interface PersonaContextProps {
  personas: IPersona[];
  userConvos: IUserConvos[];
  loading: boolean;
  updatePersonas: () => Promise<void>;
  setUserConvos: Dispatch<SetStateAction<IUserConvos[]>>;
  setPersonas: Dispatch<SetStateAction<IPersona[]>>;
}

const PersonaContext = createContext<PersonaContextProps>({
  personas: [],
  userConvos: [],
  loading: false,
  setUserConvos: () => {},
  updatePersonas: async () => {},
  setPersonas: () => {},
});

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [personas, setPersonas] = useState<IPersona[]>([]);
  const [userConvos, setUserConvos] = useState<IUserConvos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const updatePersonas = async () => {
    setLoading(true);
    try {
      const response = await Promise.all([getUserConvos()]);
      // setPersonas(response[0].data);
      setUserConvos(
        response[0].data.sort((a: IUserConvos, b: IUserConvos) =>
          b.timestamp.localeCompare(a.timestamp)
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
      value={{
        personas,
        userConvos,
        updatePersonas,
        setPersonas,
        setUserConvos,
        loading,
      }}
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
