type BookmarkType = {
  user_id: number;
  req_id: number;
};

export default async function addToBookmark(
  token: string,
  { user_id, req_id }: BookmarkType
) {
  const res = await fetch(`${process.env.API}/bookmarks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      user_id,
      req_id,
    }),
  });

  if (res.status !== 200) {
    console.log(await res.json());
  }

  return res.json();
}
