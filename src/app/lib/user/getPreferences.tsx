const getPreferences = async () => {
  const res = await fetch(`${process.env.API}/user_preferances/10`, {
    method: "OPTIONS",
    headers: {
      Authorization: `Bearer ${"31|v2PBowxFZzHajIqxEYQYIYb6VKfu8E8oiJsZjSW1"}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return res.json();
};

export default getPreferences;
