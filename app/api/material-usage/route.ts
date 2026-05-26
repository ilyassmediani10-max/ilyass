import { createMaterialUsage, getMaterialUsage } from "@/services/material-service";
import { requireAdmin } from "@/utils/access-control";
import { getApiErrorMessage } from "@/utils/api-error";
import { materialUsageSchema, type IMaterialUsageInput } from "@/validators/material-validator";

export async function GET() {
  try {
    const usage = await getMaterialUsage();

    return Response.json(usage);
  } catch (error) {
    return Response.json(
      {
        message: getApiErrorMessage(error, "Could not load material usage"),
      },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);

    const body: IMaterialUsageInput = materialUsageSchema.parse(await request.json());
    const insertedId = await createMaterialUsage(body);

    return Response.json(
      {
        insertedId,
        message: "Material usage created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        message: getApiErrorMessage(error, "Could not create material usage"),
      },
      { status: 400 },
    );
  }
}
