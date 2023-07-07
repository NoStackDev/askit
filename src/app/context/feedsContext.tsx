"use client";

import React from "react";
import { FeedsResponse, RequestResponseType, RequestType } from "../types";

type FeedsContextType = {
  feeds: FeedsResponse | null;
  setFeeds: React.Dispatch<React.SetStateAction<FeedsResponse | null>>;
  currentFeedsUrl: URL | null;
  setCurrentFeedsUrl: React.Dispatch<React.SetStateAction<URL | null>>;
};

const FeedsContext = React.createContext<FeedsContextType>({
  feeds: {
    data: [],
    links: {
      first: null,
      last: null,
      prev: null,
      next: null,
    },
    meta: {
      current_page: 0,
      from: null,
      last_page: 0,
      links: [],
      path: "",
      per_page: 12,
      to: 10,
      total: 0,
    },
  },
  setFeeds: () => {},
  currentFeedsUrl: null,
  setCurrentFeedsUrl: () => "",
});

interface FeedsContextProviderI {
  children: React.ReactNode;
}

export const FeedsContextProvider = ({ children }: FeedsContextProviderI) => {
  const [feeds, setFeeds] = React.useState<FeedsResponse | null>(null);
  const [currentFeedsUrl, setCurrentFeedsUrl] = React.useState<URL | null>(
    null
  );

  return (
    <FeedsContext.Provider
      value={{ feeds, setFeeds, currentFeedsUrl, setCurrentFeedsUrl }}
    >
      {children}
    </FeedsContext.Provider>
  );
};

export const useFeedsContext = () => React.useContext(FeedsContext);
