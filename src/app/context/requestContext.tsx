"use client";

import React from "react";
import { RequestType } from "../types";

type requestContextType = {
  requests: RequestType[] | null;
  setRequests: React.Dispatch<React.SetStateAction<RequestType[] | null>>;
  requestsState: "LOADING" | "SUCCESS" | "FAILED" | null;
  setRequestState: React.Dispatch<
    React.SetStateAction<"LOADING" | "SUCCESS" | "FAILED" | null>
  >;
  requestStatus: "POSTING" | "SUCCESS" | "FAILED" | null;
  setRequestStatus: React.Dispatch<"POSTING" | "SUCCESS" | "FAILED" | null>;
};

const RequestContext = React.createContext<requestContextType>({
  requests: null,
  setRequests: () => "",
  requestsState: null,
  setRequestState: () => "",
  requestStatus: null,
  setRequestStatus: () => {},
});

type RequestContextProviderType = {
  children: React.ReactNode;
};

export const RequestContextProvider = ({
  children,
}: RequestContextProviderType) => {
  const [requests, setRequests] = React.useState<RequestType[] | null>(null);
  const [requestsState, setRequestState] = React.useState<
    "LOADING" | "SUCCESS" | "FAILED" | null
  >(null);
  const [requestStatus, setRequestStatus] = React.useState<
    "POSTING" | "SUCCESS" | "FAILED" | null
  >(null);

  return (
    <RequestContext.Provider
      value={{
        requests,
        setRequests,
        requestsState,
        setRequestState,
        requestStatus,
        setRequestStatus,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestContext = () => React.useContext(RequestContext);
