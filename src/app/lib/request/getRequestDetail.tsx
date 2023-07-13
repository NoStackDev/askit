const getRequestDetail = async (requestId: number) => {
  const res = await fetch(`${process.env.API}/requests/${requestId}`, {
    method: "OPTIONS",
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
};

export default getRequestDetail;
