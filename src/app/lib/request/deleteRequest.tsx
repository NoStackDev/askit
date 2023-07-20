const deleteRequest = async (token: string, requestId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/requests/${requestId}`, {
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
};

export default deleteRequest;
