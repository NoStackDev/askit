const getBookmarks = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/bookmarks`, {
    method: "OPTIONS",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (res.status >= 200 && res.status <= 299) {
    return res.json();
  }

  if (res.status < 200 || res.status > 299) {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }
};

export default getBookmarks;
