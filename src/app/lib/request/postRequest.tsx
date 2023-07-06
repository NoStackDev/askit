export default async function postRequest(
  token: string,
  data: FormData,
  headers: Headers
) {
  const res = await fetch(`${process.env.API}/requests`, {
    method: "POST",
    headers: headers,
    body: data,
  });

  return res.json();
}
