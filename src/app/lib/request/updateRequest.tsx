type RequestType = {
  requestId: number;
  title: string;
  user_id: number;
  category_group_id: number;
  location_id: number;
  description: string;
  image?: File;
};

export default async function postRequest(
  token: string,
  {
    requestId,
    title,
    user_id,
    category_group_id,
    location_id,
    description,
    image,
  }: RequestType
) {
  console.log(`Bearer ${token}`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/requests/${requestId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      title,
      user_id,
      category_group_id,
      location_id,
      description,
      image,
    }),
  });

  return res.json();
}
