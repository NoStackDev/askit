export default async function postRequest(
  token: string,
  data: FormData,
  headers: Headers
) {
  console.log(data.get("location_id"));
  const res = await fetch(`${process.env.API}/requests`, {
    method: "POST",
    headers: headers,
    body: data,
  });

  if (res.status !== 200) {
    console.log(await res.json());
  }

  return res.json();
}
