import { signIn } from "@/services/auth-service";
import { AUTH_COOKIE } from "@/utils/session-cookie";
import { signInSchema } from "@/validators/auth-validator";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = signInSchema.parse(await request.json());
    const session = await signIn(body);

    return Response.json(
      { role: session.role },
      {
        headers: {
          "Set-Cookie": `${AUTH_COOKIE}=${session.cookie}; HttpOnly; Path=/; SameSite=Lax`,
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof ZodError ? (error.issues[0]?.message ?? "Check your sign in details.") :
          error instanceof Error ? error.message : "Could not sign in",
      },
      { status: 400 },
    );
  }
}
