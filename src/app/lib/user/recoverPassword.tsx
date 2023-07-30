export default async function recoverpassword(email: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/forgot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });

  if (res.status >= 200 && res.status <= 299) {
    const json = await res.json();
    return json;
  }

  if (res.status < 200 || res.status > 299) {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }

  return res.json();
}
