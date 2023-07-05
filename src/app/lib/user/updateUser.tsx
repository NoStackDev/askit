type UpdateUserI = {
  about?: string;
  business_addr?: string;
  location_id?: string;
  facebook_link?: string;
  instagram_link?: string;
  whatsapp_num?: string;
  profile_img?: any;
};

const updateUser = async (data: FormData, token: string) => {
  const res = await fetch(`${process.env.API}/update`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  return res.json();
};

export default updateUser;
