export default async function getUser(token: string) {
  console.log(`Bearer ${token}`);
  const res = await fetch(`${process.env.API}/user`, {
    method: "OPTIONS",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error(`Failed to get user data\n error: ${res.body}`);

  return res.json();
}
