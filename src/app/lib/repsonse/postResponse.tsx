export default async function postResponse(header: Headers, data: FormData) {
  const res = await fetch(`${process.env.API}/responses`, {
    method: "POST",
    headers: header,
    body: data,
  });

  return res.json();
}
