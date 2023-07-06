const updateUser = async (headers: Headers, data: FormData) => {
  const res = await fetch(`${process.env.API}/update`, {
    method: "POST",
    headers: headers,
    body: data,
  });

  return res.json();
};

export default updateUser;
