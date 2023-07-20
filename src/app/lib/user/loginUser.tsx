interface LoginI {
  email: string;
  password: string;
}

export default async function loginUser({ email, password }: LoginI) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
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
}
