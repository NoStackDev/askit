type BookmarkType = {
  user_id: number;
  req_id: number;
};

const deleteBookmark = async (
  token: string,
  { user_id, req_id }: BookmarkType
) => {
  const res = await fetch(`${process.env.API}/bookmarks`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
};

export default deleteBookmark;
