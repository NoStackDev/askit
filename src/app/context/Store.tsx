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

interface CityInterface {
  id: number;
  city: string;
  state: string;
}

interface CitiesInterface {
  cities: Record<string, CityInterface[]> | null;
  setCities: Dispatch<SetStateAction<Record<string, CityInterface[]> | null>>;
}

const GlobalContext = createContext<
  TokenType & UserContextType & CitiesInterface
>({
  token: null,
  setToken: () => "",
  user: null,
  setUser: () => {},
  cities: null,
  setCities: () => "",
});

type GlobalContextProviderType = {
  children: React.ReactNode;
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderType) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserAuthType | null>(null);
  const [cities, setCities] = useState<Record<string, CityInterface[]> | null>(
    null
  );

  return (
    <GlobalContext.Provider
      value={{ token, setToken, user, setUser, cities, setCities }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
