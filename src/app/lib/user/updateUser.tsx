const updateUser = async (headers: Headers, data: FormData) => {
  const res = await fetch(`${process.env.API}/update`, {
    method: "POST",
    headers: headers,
    body: data,
  });

  if (res.status === 200) {
    const json = await res.json();
    return json;
  }

  if (res.status !== 200) {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }
};

export default updateUser;
