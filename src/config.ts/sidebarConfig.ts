interface SidebarItem1 {
  id: string;
  title: string;
  href: string | null;
  children: SidebarItem1[] | null;
  subChildren: SidebarItem1[] | null;
}

export const sidebarConfig1: SidebarItem1[] = [
  {
    id: "Home",
    title: "Home",
    href: "/",
    children: null,
    subChildren: null,
  },

  {
    id: "Categories",
    title: "Categories",
    href: null,
    subChildren: null,
    children: [],
  },

  {
    id: "My Requests",
    title: "My Requests",
    href: "/myRequests",
    children: null,
    subChildren: null,
  },

  {
    id: "saved",
    title: "Saved",
    href: "/savedRequests",
    children: null,
    subChildren: null,
  },

  {
    id: "profile",
    title: "Profile",
    href: "/profile",
    children: null,
    subChildren: null,
  },

  {
    id: "settings",
    title: "Settings",
    href: "/settings",
    children: null,
    subChildren: null,
  },
];
