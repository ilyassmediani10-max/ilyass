import { cookies } from "next/headers";
import { AUTH_COOKIE, verifySessionCookie } from "@/utils/session-cookie";

export async function getCurrentSession() {
  const cookieStore = await cookies();

  return verifySessionCookie(cookieStore.get(AUTH_COOKIE)?.value);
}

export async function getCurrentRole() {
  const session = await getCurrentSession();

  return session?.role ?? null;
}
