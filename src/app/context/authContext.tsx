"use client";

import React from "react";

interface ActionI {
  type:
    | "LOGIN_START"
    | "UPDATING"
    | "LOGIN_SUCCESSFUL"
    | "REGISTRATION_SUCCESSFUL"
    | "FAILURE"
    | "RESET";
}

const AuthReducer = (state: AuthContextI, action: ActionI) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        isLoading: true,
        isSuccess: false,
        isOnboarding: false,
        isError: false,
      };
    case "UPDATING":
      return {
        isLoading: true,
        isSuccess: false,
        isOnboarding: true,
        isError: false,
      };
    case "LOGIN_SUCCESSFUL":
      return {
        isLoading: false,
        isSuccess: true,
        isOnboarding: false,
        isError: false,
      };
    case "REGISTRATION_SUCCESSFUL":
      return {
        isLoading: false,
        isSuccess: true,
        isOnboarding: true,
        isError: false,
      };
    case "FAILURE":
      return {
        isLoading: false,
        isSuccess: false,
        isOnboarding: false,
        isError: true,
      };

    case "RESET":
      return {
        isLoading: false,
        isSuccess: false,
        isError: false,
        isOnboarding: false,
      };

    default:
      return state;
  }
};

interface AuthContextI {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isOnboarding: boolean;
}

interface DispatchI {
  dispatch: React.Dispatch<ActionI>;
}

const AuthContext = React.createContext<AuthContextI & DispatchI>({
  isLoading: false,
  isSuccess: false,
  isError: false,
  isOnboarding: false,
  dispatch: () => {},
});

interface AuthContextProviderI {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderI) => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<AuthContextI, ActionI>
  >(AuthReducer, {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isOnboarding: true,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
