import { signIn } from "@/services/auth-service";
import { getApiErrorMessage } from "@/utils/api-error";
import { AUTH_COOKIE } from "@/utils/session-cookie";
import { signInSchema } from "@/validators/auth-validator";

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
        message: getApiErrorMessage(error, "Could not sign in"),
      },
      { status: 400 },
    );
  }
}
