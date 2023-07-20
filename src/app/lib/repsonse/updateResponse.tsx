type ResponseType = {
  responseId: number;
  title: string;
  user_id: number;
  req_id: number;
  category_group_id: number;
  location_id: number;
  description: string;
  whatsapp_num: string;
  price: number;
  visibility: "private" | "public";
  image?: File;
};

export default async function updateResponse(
  token: string,
  {
    responseId,
    title,
    user_id,
    req_id,
    category_group_id,
    location_id,
    description,
    whatsapp_num,
    price,
    visibility,
    image,
  }: ResponseType
) {
  console.log(`Bearer ${token}`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/responses/${responseId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      title,
      user_id,
      req_id,
      category_group_id,
      location_id,
      description,
      whatsapp_num,
      price,
      visibility,
      image,
    }),
  });

  return res.json();
}
