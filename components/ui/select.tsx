import * as React from "react";
import { cn } from "@/utils/cn";

type IProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: IProps) {
  return (
    <select
      className={cn(
        "h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs outline-none transition",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
