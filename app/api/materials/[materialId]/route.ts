import { deleteMaterial, updateMaterial } from "@/services/material-service";
import { requireAdmin } from "@/utils/access-control";
import { getApiErrorMessage } from "@/utils/api-error";
import { materialSchema, type IMaterialInput } from "@/validators/material-validator";

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/materials/[materialId]">,
) {
  try {
    await requireAdmin(request);

    const { materialId } = await ctx.params;
    const body: IMaterialInput = materialSchema.parse(await request.json());

    await updateMaterial(materialId, body);

    return Response.json({
      message: "Material updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: getApiErrorMessage(error, "Could not update material"),
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  ctx: RouteContext<"/api/materials/[materialId]">,
) {
  try {
    await requireAdmin(request);

    const { materialId } = await ctx.params;

    await deleteMaterial(materialId);

    return Response.json({
      message: "Material deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: getApiErrorMessage(error, "Could not delete material"),
      },
      { status: 400 },
    );
  }
}
