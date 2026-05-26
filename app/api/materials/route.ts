import { createMaterial, getMaterials } from "@/services/material-service";
import { requireAdmin } from "@/utils/access-control";
import { materialSchema, type IMaterialInput } from "@/validators/material-validator";

export async function GET() {
  try {
    const materials = await getMaterials();

    return Response.json(materials);
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Could not load materials",
      },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);

    const body: IMaterialInput = materialSchema.parse(await request.json());
    const insertedId = await createMaterial(body);

    return Response.json(
      {
        insertedId,
        message: "Material created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Could not create material",
      },
      { status: 400 },
    );
  }
}
