const getPreferences = async (token: string, userId: number) => {
  const res = await fetch(`${process.env.API}/user_preferances/${userId}`, {
    method: "OPTIONS",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status === 200) {
    return res.json();
  }

  if (res.status !== 200) {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }
};

export default getPreferences;
