interface AuthContextI {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isOnboarding: boolean;
}

interface ActionI {
  type: string;
  payload: any;
}

export const AuthReducer = (state: AuthContextI, action: ActionI) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        isLoading: true,
        isSuccess: false,
        isOnboarding: false,
        isError: null,
      };
    case "LOGIN_SUCCESSFUL":
      return {
        isLoading: false,
        isSuccess: false,
        isOnboarding: false,
        isError: null,
      };
    case "REGISTRATION_SUCCESSFUL":
      return {
        isLoading: false,
        isSuccess: true,
        isOnboarding: true,
        isError: null,
      };
    case "LOGIN_FAILURE":
      return {
        isLoading: false,
        registered: false,
        isOnboarding: false,
        isError: action.payload,
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
