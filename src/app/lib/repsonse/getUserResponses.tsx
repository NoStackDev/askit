const getUserResponses = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/responses`, {
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

  return res.json();
};

export default getUserResponses;
