const deleteRequest = async (token: string, requestId: number) => {
  const res = await fetch(`${process.env.API}/requests/${requestId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
};

export default deleteRequest;
