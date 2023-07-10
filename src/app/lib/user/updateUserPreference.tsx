export default async function updateUserPreference(
  headers: Headers,
  data: FormData
) {
  const res = await fetch(`${process.env.API}/user_preferances`, {
    method: "POST",
    headers: headers,
    body: data,
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
