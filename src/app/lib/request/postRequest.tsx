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

  if (res.status === 200) {
    const json = await res.json();
    return json;
  }

  if (res.status !== 200) {
    const json = await res.json();
    console.log(json);
    return json;
  }
}
