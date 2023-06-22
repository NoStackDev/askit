import { sidebarItem } from "@/types";

export const sidebarConfig: sidebarItem[] = [
  {
    id: "home",
    title: "Home",
    href: "/",
    children: null,
  },
  {
    id: "categories",
    title: "Categories",
    href: null,
    children: [
      {
        id: "products",
        title: "Products",
        href: "/products",
        children: [
          {
            id: "fashion",
            title: "Fashion",
            href: "/",
            children: null,
          },
          {
            id: "home&office",
            title: "Home & Office",
            href: "/",
            children: null,
          },
          {
            id: "industrial",
            title: "Industrial",
            href: "/",
            children: null,
          },
          {
            id: "automobile",
            title: "Automobile",
            href: "/",
            children: null,
          },
          {
            id: "electronics",
            title: "Electronics",
            href: "/",
            children: null,
          },
          {
            id: "books",
            title: "Books",
            href: "/",
            children: null,
          },
          {
            id: "kids&BabiesProduct",
            title: "Kids & Babies Product",
            href: "/",
            children: null,
          },
          {
            id: "phone&Computers",
            title: "Phone & Computers",
            href: "/",
            children: null,
          },
          {
            id: "medical",
            title: "Medical",
            href: "/",
            children: null,
          },
          {
            id: "health&BeautyProducts",
            title: "Health & Beauty Products",
            href: "/",
            children: null,
          },
          {
            id: "agro",
            title: "Agro",
            href: "/",
            children: null,
          },
        ],
      },
      {
        id: "services",
        title: "Services",
        href: "/services",
        children: [
          {
            id: "ICT",
            title: "ICT",
            href: "/",
            children: null,
          },
        ],
      },
      {
        id: "accomodation",
        title: "Accomodation",
        href: "/accomodation",
        children: null,
      },
      {
        id: "job",
        title: "Job",
        href: "/job",
        children: null,
      },
      {
        id: "suggestion",
        title: "Suggestion",
        href: "/suggestion",
        children: null,
      },
    ],
  },

  {
    id: "myRequests",
    title: "My Requests",
    href: "/myRequests",
    children: null,
  },
  {
    id: "saved",
    title: "Saved",
    href: "/savedRequests",
    children: null,
  },
  {
    id: "profile",
    title: "Profile",
    href: "/profile",
    children: null,
  },
  {
    id: "settings",
    title: "Settings",
    href: "/settings",
    children: null,
  },
];
