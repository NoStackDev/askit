export default async function updateUserPreference(
  user_id: string,
  all_categories: boolean,
  selected_categories: number[],
  all_locations: boolean,
  selected_locations: number[]
) {
  const res = await fetch(`${process.env.API}/user_preferances`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"31|v2PBowxFZzHajIqxEYQYIYb6VKfu8E8oiJsZjSW1"}`,
    },
    body: JSON.stringify({
      user_id,
      all_categories,
      selected_categories,
      all_locations,
      selected_locations,
    }),
  });

  return res.json();
}
