export interface sidebarItem {
  id: string;
  title: string;
  href: string | null;
  children: sidebarItem[] | null;
}
