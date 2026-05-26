import { signUp } from "@/services/auth-service";
import { AUTH_COOKIE } from "@/utils/session-cookie";
import { authSchema, type AuthInput } from "@/validators/auth-validator";

export async function POST(request: Request) {
  try {
    const body: AuthInput = authSchema.parse(await request.json());
    const session = await signUp(body);

    return Response.json(
      { role: session.role },
      {
        headers: {
          "Set-Cookie": `${AUTH_COOKIE}=${session.cookie}; HttpOnly; Path=/; SameSite=Lax`,
        },
        status: 201,
      },
    );
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Could not create account",
      },
      { status: 400 },
    );
  }
}
