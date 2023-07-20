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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
  });

  if (res.status === 200) {
    const json = await res.json();
    return json;
  }

  if (res.status !== 200) {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }

  return res.json();
}
