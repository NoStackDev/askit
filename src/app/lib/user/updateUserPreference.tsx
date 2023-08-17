export default async function updateUserPreference(
  token: string,
  data: {
    user_id: number;
    all_categories: boolean;
    selected_categories: number[];
    all_locations: boolean;
    selected_locations: number[];
  }
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user_preferances`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    return res.json();
  }

  if (res.status === 401) {
    const json = await res.json();
    console.log(json);
    return { isError: true, statusCode: 401 };
  }

  if (res.status !== 200) {
    const json = await res.json();
    console.log(json);
    return { error: true, ...json };
  }
}
