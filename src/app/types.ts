export type UserType = {
  about: string;
  business_addr: string;
  email: string;
  facebook_link: string;
  id: number;
  image_url: string;
  instagram_link: string;
  location: string;
  name: string;
  role: string;
  whatsapp_num: string;
};

export type City = {
  countryCode: string;
  country: string;
  geonameid: number;
  name: string;
  subcountry: string;
};

export type RequestType = {
  bookmark: boolean;
  category: string;
  created_at: string;
  description: string;
  id: number;
  image_url: string | null;
  location: string;
  title: string;
  user: string;
};

export type RequestResponseType = {
  success: boolean;
  data: RequestType;
};

export type FeedsLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

export type FeedsMeta = {
  current_page: number;
  from: null | number;
  last_page: number;
  links: { url: null | string; label: string; active: boolean }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type FeedsResponse = {
  data: RequestType[];
  links: FeedsLinks;
  meta: FeedsMeta;
};

export type ResponseType = {
  bookmark: boolean;
  category: null;
  created_at: string;
  description: string;
  id: number;
  image_url: string | null;
  location: string;
  title: string;
  user: string;
};

export type PostResponseType = {
  success: boolean;
  data: {
    created_at: string;
    description: string;
    id: number;
    image_url: string;
    location_id: number;
    price: string;
    req_id: number;
    title: string;
    updated_at: string;
    user_id: number;
    visibility: string;
    whatsapp_num: string;
  };
};

export type RequestDetailType = {
  success: boolean;
  request: RequestType;
  responses: RequestDetailResponseType[];
};

export type RequestDetailResponseType = {
  created_at: string;
  description: string;
  id: number;
  image_url: string;
  location: string;
  price: number;
  request_url: string;
  title: string;
  user: string;
  visibility: string;
  whatsapp_num: string;
};
