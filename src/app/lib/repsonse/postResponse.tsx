export default async function postResponse(header: Headers, data: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/responses`, {
    method: "POST",
    headers: header,
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

  if (res.status < 200 || res.status > 299) {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }
}
