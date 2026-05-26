import * as React from "react";
import { cn } from "@/utils/cn";

type IProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "icon";
};

const variants = {
  default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
  outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
  ghost: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
};

const sizes = {
  default: "h-9 px-4 py-2",
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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
