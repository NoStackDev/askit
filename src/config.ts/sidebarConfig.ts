interface sidebarItem {
  id: string;
  title: string;
  href: string | null;
  children: sidebarItem[] | null;
}

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
    children: [
      {
        id: "Products",
        title: "Products",
        href: "/products",
        children: null,
        subChildren: [
          {
            id: "Fashion",
            title: "Fashion",
            href: "/products/fashion",
            children: null,
            subChildren: null,
          },
          {
            id: "Home & Office",
            title: "Home & Office",
            href: "/products/home_office",
            children: null,
            subChildren: null,
          },
          {
            id: "Industrial",
            title: "Industrial",
            href: "/products/industrial",
            children: null,
            subChildren: null,
          },
          {
            id: "Automobile",
            title: "Automobile",
            href: "/products/automobile",
            children: null,
            subChildren: null,
          },
          {
            id: "Electronics",
            title: "Electronics",
            href: "/products/electronics",
            children: null,
            subChildren: null,
          },
          {
            id: "Books",
            title: "Books",
            href: "/products/books",
            children: null,
            subChildren: null,
          },
          {
            id: "Kids & Babies Product",
            title: "Kids & Babies Product",
            href: "/products/Kids_babies_product",
            children: null,
            subChildren: null,
          },
          {
            id: "Phone & Computers",
            title: "Phone & Computers",
            href: "/products/phone_computers",
            children: null,
            subChildren: null,
          },
          {
            id: "Medical",
            title: "Medical",
            href: "/products/medical",
            children: null,
            subChildren: null,
          },
          {
            id: "Health & Beauty Products",
            title: "Health & Beauty Products",
            href: "/products/health_&_beauty_products",
            children: null,
            subChildren: null,
          },
          {
            id: "Agro",
            title: "Agro",
            href: "/products/agro",
            children: null,
            subChildren: null,
          },
        ],
      },

      {
        id: "Services",
        title: "Services",
        href: "/products/services",
        subChildren: [
          {
            id: "ICT",
            title: "ICT",
            href: "/services/ict",
            children: null,
            subChildren: null,
          },
          {
            id: "Financial",
            title: "Financial",
            href: "/services/financial",
            children: null,
            subChildren: null,
          },
          {
            id: "Engineering",
            title: "Engineering",
            href: "/services/engineering",
            children: null,
            subChildren: null,
          },
          {
            id: "Event",
            title: "Event",
            href: "/services/event",
            children: null,
            subChildren: null,
          },
          {
            id: "Logistics",
            title: "Logistics",
            href: "/services/logistics",
            children: null,
            subChildren: null,
          },
          {
            id: "Legal",
            title: "Legal",
            href: "/services/legal",
            children: null,
            subChildren: null,
          },
        ],
        children: null,
      },

      {
        id: "Social",
        title: "Social",
        href: "/social",
        children: null,
        subChildren: [
          {
            id: "Relationship",
            title: "Relationship",
            href: "/services/relationship",
            children: null,
            subChildren: null,
          },
          {
            id: "Hookup",
            title: "Hookup",
            href: "/services/hookup",
            children: null,
            subChildren: null,
          },
          {
            id: "Business Partner",
            title: "Business Partner",
            href: "/services/business_partner",
            children: null,
            subChildren: null,
          },
          {
            id: "Friendship",
            title: "Friendship",
            href: "/services/friendship",
            children: null,
            subChildren: null,
          },
        ],
      },

      {
        id: "Accomodation",
        title: "Accomodation",
        href: "/accomodation",
        children: null,
        subChildren: [
          {
            id: "Shop",
            title: "Shop",
            href: "/accomodation/Shop",
            children: null,
            subChildren: null,
          },
          {
            id: "Land",
            title: "Land",
            href: "/accomodation/Land",
            children: null,
            subChildren: null,
          },
          {
            id: "Office",
            title: "Office",
            href: "/accomodation/office",
            children: null,
            subChildren: null,
          },
          {
            id: "Residential",
            title: "Residential",
            href: "/accomodation/residential",
            children: null,
            subChildren: null,
          },
          {
            id: "Hostel",
            title: "Hostel",
            href: "/accomodation/hostel",
            children: null,
            subChildren: null,
          },
        ],
      },

      {
        id: "Jobs",
        title: "Jobs",
        href: "/jobs",
        children: null,
        subChildren: [
          {
            id: "ICT",
            title: "ICT",
            href: "/jobs/ict",
            children: null,
            subChildren: null,
          },
          {
            id: "Engineering",
            title: "Engineering",
            href: "/jobs/engineering",
            children: null,
            subChildren: null,
          },
          {
            id: "Art & Beauty",
            title: "Art & Beauty",
            href: "/jobs/art_&_beauty",
            children: null,
            subChildren: null,
          },
          {
            id: "Marketing & Sales",
            title: "Marketing & Sales",
            href: "/jobs/marketing_&_sales",
            children: null,
            subChildren: null,
          },
          {
            id: "Educational",
            title: "Educational",
            href: "/jobs/educational",
            children: null,
            subChildren: null,
          },
          {
            id: "Menial job",
            title: "Menial job",
            href: "/jobs/menial_job",
            children: null,
            subChildren: null,
          },
          {
            id: "Logistics",
            title: "Logistics",
            href: "/jobs/logistics",
            children: null,
            subChildren: null,
          },
          {
            id: "Law",
            title: "Law",
            href: "/jobs/law",
            children: null,
            subChildren: null,
          },
          {
            id: "Health care",
            title: "Health care",
            href: "/jobs/health_care",
            children: null,
            subChildren: null,
          },
          {
            id: "Cooperate",
            title: "Cooperate",
            href: "/jobs/cooperate",
            children: null,
            subChildren: null,
          },
        ],
      },

      {
        id: "Missing Item",
        title: "Missing Item",
        href: "/jobs/missing_item",
        children: null,
        subChildren: [
          {
            id: "Lost items",
            title: "Lost items",
            href: "/missing_item/lost_items",
            children: null,
            subChildren: null,
          },
          {
            id: "Found items",
            title: "Found items",
            href: "/missing_item/found_items",
            children: null,
            subChildren: null,
          },
        ],
      },
    ],
  },

  {
    id: "My Reqeusts",
    title: "My Reqeusts",
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
