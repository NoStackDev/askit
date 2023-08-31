const getPreferences = async (token: string, userId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/user_preferances/${userId}`,
    {
      method: "OPTIONS",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (res.status >= 200 && res.status <= 299) {
    const json = await res.json();
    return json;
  }

  if (res.status !== 200) {
    const json = await res.json();
    console.log(json);
    return { isError: true, ...json };
  }
};

export default getPreferences;
