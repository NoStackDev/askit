"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type CategoryType = {
  id: number;
  name: string;
  category: string;
};

type SidebarContextType = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  categories: Record<string, CategoryType[]> | null;
  setCategories: Dispatch<
    SetStateAction<Record<string, CategoryType[]> | null>
  >;
};

const SidebarContext = createContext<SidebarContextType>({
  showSidebar: false,
  setShowSidebar: () => {},
  categories: null,
  setCategories: () => "",
});

type SidebarContextProvider = {
  children: React.ReactNode;
};

export const SidebarContextProvider = ({
  children,
}: SidebarContextProvider) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [categories, setCategories] = useState<Record<
    string,
    CategoryType[]
  > | null>(null);

  return (
    <SidebarContext.Provider
      value={{ showSidebar, setShowSidebar, categories, setCategories }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
