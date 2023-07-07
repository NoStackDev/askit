const getUserResponses = async (token: string) => {
  const res = await fetch(`${process.env.API}/responses`, {
    method: "OPTIONS",
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

export default getUserResponses;
