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
import { navGroups } from "@/constants/nav-data";
import type { UserRole } from "@/types/auth-t";
import { filterNavGroups } from "@/utils/access-control";

type IProps = {
  role: UserRole | null;
};

export function Nav({ role }: IProps) {
  if (!role) {
    return null;
  }

  const visibleGroups = filterNavGroups(navGroups, role);

  if (visibleGroups.length === 0) {
    return null;
  }

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="flex-wrap justify-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {visibleGroups.map((group) => (
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
