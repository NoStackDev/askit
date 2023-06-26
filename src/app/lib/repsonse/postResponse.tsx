type ResponseType = {
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

export default async function postRequest(
  token: string,
  {
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
  const res = await fetch(`${process.env.API}/requests`, {
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
