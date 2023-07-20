const deleteResponse = async (token: string, responseId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/responses/${responseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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

  return res.json();
};

export default deleteResponse;
