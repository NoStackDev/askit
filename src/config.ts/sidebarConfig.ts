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
        children: null,
      },
      {
        id: "services",
        title: "Services",
        href: "/services",
        children: null,
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
    href: "/myrequests",
    children: null,
  },
  {
    id: "saved",
    title: "Saved",
    href: "/saved",
    children: null,
  },
  {
    id: "profile",
    title: "Profile",
    href: "/profile",
    children: null,
  },
  {
    id: "help",
    title: "Help",
    href: "/help",
    children: null,
  },
];
