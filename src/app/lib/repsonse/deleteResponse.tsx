const deleteResponse = async (token: string, requestId: number) => {
  const res = await fetch(`${process.env.API}/responses/${requestId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
};

export default deleteResponse;
