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

type UserAuthType = {
  authEmail: string | null;
  authPassword: string | null;
};

interface UserContextType {
  user: UserAuthType | null;
  setUser: Dispatch<SetStateAction<UserAuthType | null>>;
}

const GlobalContext = createContext<TokenType & UserContextType>({
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
  const [user, setUser] = useState<UserAuthType | null>(null);

  return (
    <GlobalContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
