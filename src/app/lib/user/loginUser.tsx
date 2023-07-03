interface LoginI {
  email: string;
  password: string;
}

interface ActionI {
  type:
    | "LOGIN_START"
    | "LOGIN_SUCCESSFUL"
    | "REGISTRATION_SUCCESSFUL"
    | "FAILURE"
    | "RESET";
}

export default async function loginUser(
  { email, password }: LoginI,
  dispatch: React.Dispatch<ActionI>
) {
  dispatch({ type: "LOGIN_START" });
  const res = await fetch(`${process.env.API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  return res.json();
}
