"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { NavGroup } from "@/types/nav-t";

const navGroups: NavGroup[] = [
  {
    label: "Clients",
    items: [
      { label: "Client List", href: "/clients" },
      { label: "Client Details", href: "/clients/details" },
      { label: "Client Orders", href: "/clients/orders" },
    ],
  },
  {
    label: "Orders",
    items: [
      { label: "Order List", href: "/orders" },
      { label: "Expired Orders", href: "/orders/expired" },
      { label: "Orders Expiring This Month", href: "/orders/expiring-this-month" },
      { label: "Order Deadlines", href: "/orders/deadlines" },
    ],
  },
  {
    label: "Materials",
    items: [
      { label: "Material List", href: "/materials" },
      { label: "Materials by Order", href: "/materials/by-order" },
      { label: "Material Usage", href: "/materials/usage" },
      { label: "Material Requirements", href: "/materials/requirements" },
    ],
  },
  {
    label: "Costs",
    items: [
      { label: "Order Prices", href: "/costs/order-prices" },
      { label: "Material Costs", href: "/costs/material-costs" },
      { label: "Total Material Costs", href: "/costs/total-material-costs" },
    ],
  },
  {
    label: "Reports",
    items: [
      { label: "Client Report", href: "/reports/clients" },
      { label: "Order Report", href: "/reports/orders" },
      { label: "Material Requirements Report", href: "/reports/material-requirements" },
      { label: "Cost Summary", href: "/reports/cost-summary" },
    ],
  },
];

export function Nav() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="flex-wrap justify-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {navGroups.map((group) => (
          <NavigationMenuItem key={group.label}>
            <NavigationMenuTrigger>{group.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-72 gap-1 p-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
