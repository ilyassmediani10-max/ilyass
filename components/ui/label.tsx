import * as React from "react";
import { cn } from "@/utils/cn";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("grid gap-1.5 text-sm font-medium text-slate-700", className)}
      {...props}
    />
  );
}
