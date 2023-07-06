const updateUser = async (data: FormData, token: string) => {
  const res = await fetch(`${process.env.API}/update`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  return res.json();
};

export default updateUser;
