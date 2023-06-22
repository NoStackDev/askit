import axios from "axios";

axios.defaults.withCredentials = true;
export default async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const res = await fetch(`${process.env.API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
  });

  if (!res.ok) throw new Error("Failed to register user");

  return res.json();
}
