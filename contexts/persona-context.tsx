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
import { getAllPersonas, getPersonaTemplates } from "@/lib/api/persona";
import { IPersona } from "@/types/persona";

interface PersonaContextProps {
  personas: IPersona[];
  loading: boolean;
  updatePersonas: () => Promise<void>;
}

const PersonaContext = createContext<PersonaContextProps>({
  personas: [],
  loading: false,
  updatePersonas: async () => {},
});

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [personas, setPersonas] = useState<IPersona[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const updatePersonas = async () => {
    setLoading(true);
    try {
      const response = await getAllPersonas();
      setPersonas(response.data);
    } catch (error: any) {
      toast.error(error?.message || "Error loading persona templates");
    }
    setLoading(false);
  };

  useEffect(() => {
    updatePersonas();
  }, []);

  return (
    <PersonaContext.Provider value={{ personas, updatePersonas, loading }}>
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
