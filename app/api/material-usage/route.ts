import { createMaterialUsage } from "@/services/material-service";
import { requireAdmin } from "@/utils/access-control";
import { materialUsageSchema, type IMaterialUsageInput } from "@/validators/material-validator";

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
        message:
          error instanceof Error ? error.message : "Could not create material usage",
      },
      { status: 400 },
    );
  }
}
