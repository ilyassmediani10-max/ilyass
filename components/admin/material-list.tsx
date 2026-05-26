import type { Material } from "@/types/material-t";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { money } from "@/utils/order-view";

type IProps = {
  materials: Material[];
};

export function MaterialList({ materials }: IProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Materials</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Material List</h1>
      </div>

      <Card className="mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Unit Cost</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.length === 0 ? (
                <TableRow>
                  <TableCell className="py-10 text-center text-muted-foreground" colSpan={4}>
                    No materials found.
                  </TableCell>
                </TableRow>
              ) : null}
              {materials.map((material) => (
                <TableRow key={material.id ?? material.name}>
                  <TableCell>{material.name}</TableCell>
                  <TableCell className="text-muted-foreground">{material.unit}</TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {money.format(material.price)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{material.description ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </main>
  );
}
