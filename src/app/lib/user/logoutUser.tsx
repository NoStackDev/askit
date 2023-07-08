export default async function logoutUser(token: string) {
  const res = await fetch(`${process.env.API}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
