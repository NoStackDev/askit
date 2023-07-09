"use client";

import React from "react";
import { RequestDetailResponseType, RequestDetailType } from "../types";

type ResponseContextType = {
  responses: RequestDetailResponseType[] | null;
  setResponses: React.Dispatch<RequestDetailResponseType[] | null>;
};

const ResponseContext = React.createContext<ResponseContextType>({
  responses: null,
  setResponses: () => {},
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

  return (
    <ResponseContext.Provider value={{ responses, setResponses }}>
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponseContext = () => React.useContext(ResponseContext);
