// app/context/MenuContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the shape of the context state
interface MenuContextType {
  isMenuExpanded: boolean;
  setIsMenuExpanded: Dispatch<SetStateAction<boolean>>;
}

// Create the context with a default value
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Create a provider component
export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(true);

  return (
    <MenuContext.Provider value={{ isMenuExpanded, setIsMenuExpanded }}>
      {children}
    </MenuContext.Provider>
  );
};

// Create a custom hook for consuming the menu context
export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
