export default async function logoutUser() {
  const res = await fetch(`${process.env.API}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"31|v2PBowxFZzHajIqxEYQYIYb6VKfu8E8oiJsZjSW1"}`,
    },
  });

  return res.json();
}
