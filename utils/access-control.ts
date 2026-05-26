import type { NavGroup } from "@/types/nav-t";
import type { UserRole } from "@/types/auth-t";
import { AUTH_COOKIE, verifySessionCookie } from "@/utils/session-cookie";

export const ROLE_COOKIE = "renovation_role";

const ADMIN_PAGE_PREFIXES = ["/materials", "/costs", "/reports"];
const USER_PAGE_PREFIXES = ["/clients", "/orders"];
const PUBLIC_PATHS = ["/", "/signin", "/signup"];

export function normalizeRole(value: string | undefined): UserRole | null {
  return value === "ADMIN" || value === "USER" ? value : null;
}

export function isAdminPage(pathname: string) {
  return ADMIN_PAGE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function isUserPage(pathname: string) {
  return USER_PAGE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function canAccessPath(role: UserRole | null, pathname: string) {
  if (PUBLIC_PATHS.includes(pathname)) {
    return true;
  }

  if (pathname.startsWith("/api/auth")) {
    return true;
  }

  if (pathname.startsWith("/api")) {
    return role !== null;
  }

  if (!role) {
    return false;
  }

  if (role === "ADMIN") {
    return true;
  }

  if (isUserPage(pathname)) {
    return true;
  }

  return false;
}

export function filterNavGroups(groups: NavGroup[], role: UserRole | null) {
  if (!role) {
    return [];
  }

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canAccessPath(role, item.href)),
    }))
    .filter((group) => group.items.length > 0);
}

function getCookieValue(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return undefined;
  }

  const cookie = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? cookie.slice(name.length + 1) : undefined;
}

export async function requireAdmin(request: Request) {
  const session = await verifySessionCookie(getCookieValue(request, AUTH_COOKIE));

  if (session?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
}
