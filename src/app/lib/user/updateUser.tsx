const updateUser = async (
  about: string,
  business_addr: string,
  location_id: string,
  facebook_link: string,
  instagram_link: string,
  whatsapp_num: string,
  profile_img?: null
) => {
  console.log("posting user update");
  const res = await fetch(`${process.env.API}/update`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${"30|sUz5kt0MrN0RF1uL5uR9TUSNKENkKLZjvqo68xwu"}`,
    },
    body: JSON.stringify({
      about,
      business_addr,
      location_id,
      facebook_link,
      whatsapp_num,
      instagram_link,
    }),
  });

  console.log("posting");
  return res.json();
};

export default updateUser;
