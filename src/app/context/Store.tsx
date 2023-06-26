"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type TokenType = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

type UserType = {
  about: string;
  business_addr: string;
  email: string;
  facebook_link: string;
  id: number;
  image_url: string;
  instagram_link: string;
  location: string;
  name: string;
  role: string;
  whatsapp_num: string;
};

interface UserContext {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
}

const GlobalContext = createContext<TokenType & UserContext>({
  token: null,
  setToken: () => "",
  user: null,
  setUser: () => {},
});

type GlobalContextProviderType = {
  children: React.ReactNode;
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderType) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <GlobalContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
