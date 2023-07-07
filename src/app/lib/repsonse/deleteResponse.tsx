const deleteResponse = async (token: string, responseId: number) => {
  const res = await fetch(`${process.env.API}/responses/${responseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status !== 200) {
    console.log(await res.json());
  }

  return res.json();
};

export default deleteResponse;
