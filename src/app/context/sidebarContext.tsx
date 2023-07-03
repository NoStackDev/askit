"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type SidebarContextType = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType>({
  showSidebar: false,
  setShowSidebar: () => {},
});

type SidebarContextProvider = {
  children: React.ReactNode;
};

export const SidebarContextProvider = ({
  children,
}: SidebarContextProvider) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
