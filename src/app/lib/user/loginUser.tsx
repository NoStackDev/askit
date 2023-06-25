import { useGlobalContext } from "@/app/context/Store";

export default async function loginUser(email: string, password: string) {
  const { token, setToken } = useGlobalContext();
  console.log(token);
  const res = await fetch(`${process.env.API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (!res.ok) throw new Error(`Failed to log in user \n error: ${res.body}`);

  return res.json();
}
