"use client";

import React from "react";
import { FeedsResponse } from "../types";

type ActionI = {
  type: "FETCHING" | "SUCCESS" | "FAILED" | "RESET" | null;
  payload?: FeedsResponse;
};

const FeedsReducer = (state: FeedsResponse, action: ActionI) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCHING":
      return state;

    case "SUCCESS":
      if (payload) return payload;

    case "FAILED":
      return state;

    case "RESET":
      return {
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
          to: null,
          total: 0,
        },
      };
    case null:
      return state;

    default:
      return state;
  }
};

interface DispatchI {
  dispatch: React.Dispatch<ActionI>;
}

const FeedsContext = React.createContext<FeedsResponse & DispatchI>({
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
    to: null,
    total: 0,
  },
  dispatch: () => {},
});

interface FeedsContextProviderI {
  children: React.ReactNode;
}

export const FeedsContextProvider = ({ children }: FeedsContextProviderI) => {
  const [feeds, dispatch] = React.useReducer<
    React.Reducer<FeedsResponse, ActionI>
  >(FeedsReducer, {
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
      to: null,
      total: 0,
    },
  });

  return (
    <FeedsContext.Provider value={{ ...feeds, dispatch }}>
      {children}
    </FeedsContext.Provider>
  );
};

export const useFeedsContext = () => React.useContext(FeedsContext);
