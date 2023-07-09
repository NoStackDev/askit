export default async function getUser(token: string) {
  const res = await fetch(`${process.env.API}/user`, {
    method: "OPTIONS",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status === 200) {
    return res.json();
  }

  if (res.status !== 200) {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }
}
