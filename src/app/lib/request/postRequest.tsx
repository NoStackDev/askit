export default async function postRequest(
  token: string,
  data: FormData,
  headers: Headers
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/requests`, {
    method: "POST",
    headers: headers,
    body: data,
  });

  if (res.status >= 200 && res.status <= 299) {
    const json = await res.json();
    return json;
  }

  if (res.status === 401) {
    const json = await res.json();
    console.log(json);
    return { isError: true, statusCode: 401 };
  }

  if (res.status !== 200) {
    const json = await res.json();
    console.log(json);
    return json;
  }
}
