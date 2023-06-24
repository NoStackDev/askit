const getLocations = async () => {
  const res = await fetch(`${process.env.API}/locations`, {
    method: "OPTIONS",
    headers: {
      Authorization: `Bearer ${"30|sUz5kt0MrN0RF1uL5uR9TUSNKENkKLZjvqo68xwu"}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
};

export default getLocations
