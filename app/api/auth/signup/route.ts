import { signUp } from "@/services/auth-service";
import { AUTH_COOKIE } from "@/utils/session-cookie";
import { signUpSchema } from "@/validators/auth-validator";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = signUpSchema.parse(await request.json());
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
          error instanceof ZodError ? (error.issues[0]?.message ?? "Check your account details.") :
          error instanceof Error ? error.message : "Could not create account",
      },
      { status: 400 },
    );
  }
}
