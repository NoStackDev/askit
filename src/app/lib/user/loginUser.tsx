interface LoginI {
  email: string;
  password: string;
}

export default async function loginUser({ email, password }: LoginI) {
  const res = await fetch(`${process.env.API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  return res.json();
}
