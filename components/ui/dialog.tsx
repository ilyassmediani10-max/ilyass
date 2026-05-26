import * as React from "react";
import { cn } from "@/utils/cn";

export function Dialog({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4", className)}
      {...props}
    />
  );
}

export function DialogContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("w-full max-w-3xl rounded-lg border border-slate-200 bg-white shadow-xl", className)}
      {...props}
    />
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-between border-b border-slate-200 px-5 py-4", className)}
      {...props}
    />
  );
}
