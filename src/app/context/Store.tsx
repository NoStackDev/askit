"use client";

import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type TokenType = { token: string; setToken: Dispatch<SetStateAction<string>> };

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
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}

const GlobalContext = createContext<TokenType & UserContext>({
  token: "33|wtDWtHIAxcveMZ8kVE1GFIzpARSDmP6A7tNd5bvE",
  setToken: () => "",
  user: {
    about: "",
    business_addr: "",
    email: "",
    facebook_link: "",
    id: 1,
    image_url: "",
    instagram_link: "",
    location: "",
    name: "",
    role: "",
    whatsapp_num: "",
  },
  setUser: () => {},
});

type GlobalContextProviderType = {
  children: React.ReactNode;
};

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderType) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserType>({
    about: "",
    business_addr: "",
    email: "",
    facebook_link: "",
    id: 1,
    image_url: "",
    instagram_link: "",
    location: "",
    name: "",
    role: "",
    whatsapp_num: "",
  });

  return (
    <GlobalContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
