interface RegisterI {
  name: string;
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

export default async function registerUser(
  { name, email, password }: RegisterI,
  dispatch: React.Dispatch<ActionI>
) {
  dispatch({ type: "LOGIN_START" });
  const res = await fetch(`${process.env.API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
  });

  return res.json();
}
