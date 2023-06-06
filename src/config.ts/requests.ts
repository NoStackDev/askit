type Request = {
  requestId: number;
  image?: boolean;
  description: string;
  moreDetail: null | string;
  commentCount: number;
  date: Date;
  location: string;
  bookmarked: boolean;
};

export const requestsConfig: Request[] = [
  {
    requestId: 0,
    image: true,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius.",
    moreDetail:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius.",
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 1,
    image: false,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius vitae mauris felis sem turpis turpis eu sed.",
    moreDetail: null,
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 2,
    image: true,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius.",
    moreDetail: null,
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 3,
    image: false,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius vitae mauris felis sem turpis turpis eu sed.",
    moreDetail: null,
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 4,
    image: false,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius vitae mauris felis sem turpis turpis eu sed.",
    moreDetail:
      "orem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius vitae mauris felis sem turpis turpis eu sed.",
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 5,
    image: true,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius.",
    moreDetail:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius.",
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 6,
    image: true,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius.",
    moreDetail: null,
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 7,
    image: false,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius vitae mauris felis sem turpis turpis eu sed.",
    moreDetail: null,
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 8,
    image: true,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius.",
    moreDetail: null,
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 9,
    image: true,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius.",
    moreDetail: null,
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
  {
    requestId: 10,
    image: false,
    description:
      "Lorem ipsum dolor sit amet consectetur. In malesuada fringilla molestie dis sapien posuere porttitor. Varius vitae mauris felis sem turpis turpis eu sed.",
    moreDetail: null,
    commentCount: 16,
    date: new Date(Date.now()),
    location: "Port Harcout",
    bookmarked: false,
  },
];
