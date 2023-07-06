export default async function postRequest(token: string, formData: FormData) {
  const res = await fetch(`${process.env.API}/requests`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
    body: formData,
  });

  return res.json();
}
