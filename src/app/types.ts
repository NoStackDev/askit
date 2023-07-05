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
  links: Record<
    string,
    { url: null | string; label: string; active: boolean }
  >[];
  path: string;
  per_page: number;
  to: null | string;
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

export type RequestDetailType = {
  success: boolean;
  request: RequestType;
  responses: ResponseType[];
};
