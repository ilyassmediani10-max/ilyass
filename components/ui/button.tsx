import * as React from "react";
import { cn } from "@/utils/cn";

type IProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "icon";
};

const variants = {
  default: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
  outline: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  destructive: "border border-red-200 bg-white text-red-600 hover:bg-red-50",
};

const sizes = {
  default: "h-10 px-4",
  icon: "size-9",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: IProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
