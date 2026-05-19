export type INav = {
  label: string;
  href: string;
};

export type NavItem = INav;

export type NavGroup = {
  label: string;
  items: NavItem[];
};
