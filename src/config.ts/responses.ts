type Responses = {
  userId: number;
  username: string;
  avatar: null | string;
  image?: boolean;
  response: string;
  date: Date;
  location: string;
  price: number;
  whatsappLink: string;
};

export const responsesConfig: Responses[] = [
  {
    userId: 0,
    username: "Username",
    avatar: null,
    image: true,
    response:
      "Lorem ipsum dolor sit amet consectetur. Eros tristique rhoncus est facilisi. Lectus leo cursus scelerisque pretium mauris purus eget sit. Mi in malesuada dictum.",
    date: new Date(Date.now()),
    location: "Port Harcourt",
    price: 6000,
    whatsappLink: "/",
  },
  {
    userId: 1,
    username: "Username",
    avatar: null,
    image: false,
    response:
      "Lorem ipsum dolor sit amet consectetur. Eros tristique rhoncus est facilisi. Lectus leo cursus scelerisque pretium mauris purus eget sit. Mi in malesuada dictum risus. Ultricies",
    date: new Date(Date.now()),
    location: "Port Harcourt",
    price: 6000,
    whatsappLink: "/",
  },
  {
    userId: 2,
    username: "Username",
    avatar: null,
    image: true,
    response:
      "Lorem ipsum dolor sit amet consectetur. Eros tristique rhoncus est facilisi. Lectus leo cursus scelerisque pretium mauris purus eget sit. Mi in malesuada dictum.",
    date: new Date(Date.now()),
    location: "Port Harcourt",
    price: 6000,
    whatsappLink: "/",
  },
  {
    userId: 3,
    username: "Username",
    avatar: null,
    image: true,
    response:
      "Lorem ipsum dolor sit amet consectetur. Eros tristique rhoncus est facilisi. Lectus leo cursus scelerisque pretium mauris purus eget sit. Mi in malesuada dictum.",
    date: new Date(Date.now()),
    location: "Port Harcourt",
    price: 6000,
    whatsappLink: "/",
  },
  {
    userId: 4,
    username: "Username",
    avatar: null,
    image: false,
    response:
      "Lorem ipsum dolor sit amet consectetur. Eros tristique rhoncus est facilisi. Lectus leo cursus scelerisque pretium mauris purus eget sit. Mi in malesuada dictum risus. Ultricies",
    date: new Date(Date.now()),
    location: "Port Harcourt",
    price: 6000,
    whatsappLink: "/",
  },
  {
    userId: 5,
    username: "Username",
    avatar: null,
    image: false,
    response:
      "Lorem ipsum dolor sit amet consectetur. Eros tristique rhoncus est facilisi. Lectus leo cursus scelerisque pretium mauris purus eget sit. Mi in malesuada dictum risus. Ultricies",
    date: new Date(Date.now()),
    location: "Port Harcourt",
    price: 6000,
    whatsappLink: "/",
  },
];
