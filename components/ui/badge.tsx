import * as React from "react";
import { cn } from "@/utils/cn";

type IProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "warning" | "muted";
};

const variants = {
  default: "border-transparent bg-primary text-primary-foreground",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  muted: "border-transparent bg-secondary text-secondary-foreground",
};

export function Badge({ className, variant = "default", ...props }: IProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
