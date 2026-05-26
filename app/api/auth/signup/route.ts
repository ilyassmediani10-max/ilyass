import { signUp } from "@/services/auth-service";
import { getApiErrorMessage } from "@/utils/api-error";
import { AUTH_COOKIE } from "@/utils/session-cookie";
import { signUpSchema } from "@/validators/auth-validator";

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
        message: getApiErrorMessage(error, "Could not create account"),
      },
      { status: 400 },
    );
  }
}
