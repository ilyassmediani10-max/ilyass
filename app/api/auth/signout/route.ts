import { AUTH_COOKIE } from "@/utils/session-cookie";

export async function POST() {
  return Response.json(
    { signedOut: true },
    {
      headers: {
        "Set-Cookie": `${AUTH_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`,
      },
    },
  );
}
