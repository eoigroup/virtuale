// app/context/MenuContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the shape of the context state
interface MenuContextType {
  isMenuExpanded: boolean;
  isOpenPremiumModal: boolean;
  setIsMenuExpanded: Dispatch<SetStateAction<boolean>>;
  setIsOpenPremiumModal: Dispatch<SetStateAction<boolean>>;
}

// Create the context with a default value
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Create a provider component
export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false); // Default to collapsed
  const [isOpenPremiumModal, setIsOpenPremiumModal] = useState<boolean>(false); // Default to collapsed

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuExpanded(true); // Expand on desktop
      } else {
        setIsMenuExpanded(false); // Collapse on mobile
      }
    };

    // Set initial state based on current screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MenuContext.Provider
      value={{
        isMenuExpanded,
        isOpenPremiumModal,
        setIsOpenPremiumModal,
        setIsMenuExpanded,
      }}
    >
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
