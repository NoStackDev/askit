const getBookmarks = async (token: string) => {
  const res = await fetch(`${process.env.API}/bookmarks`, {
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

export default getBookmarks;
