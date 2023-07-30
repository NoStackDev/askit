"use client";

import React from "react";
import { RequestDetailResponseType, RequestDetailType } from "../types";

type ResponseContextType = {
  responses: RequestDetailResponseType[] | null;
  setResponses: React.Dispatch<RequestDetailResponseType[] | null>;
  responseStatus: "POSTING" | "SUCCESS" | "FAILED" | null;
  setResponseStatus: React.Dispatch<"POSTING" | "SUCCESS" | "FAILED" | null>;
};

const ResponseContext = React.createContext<ResponseContextType>({
  responses: null,
  setResponses: () => {},
  responseStatus: null,
  setResponseStatus: () => {},
});

interface ResponseContextProviderI {
  children: React.ReactNode;
}

export const ResponseContextProvider = ({
  children,
}: ResponseContextProviderI) => {
  const [responses, setResponses] = React.useState<
    RequestDetailResponseType[] | null
  >(null);
  const [responseStatus, setResponseStatus] = React.useState<
    "POSTING" | "SUCCESS" | "FAILED" | null
  >(null);

  return (
    <ResponseContext.Provider
      value={{ responses, setResponses, responseStatus, setResponseStatus }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponseContext = () => React.useContext(ResponseContext);
