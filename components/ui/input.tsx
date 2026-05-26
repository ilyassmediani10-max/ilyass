import * as React from "react";
import { cn } from "@/utils/cn";

type IProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: IProps) {
  return (
    <input
      className={cn(
        "h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100",
        className,
      )}
      {...props}
    />
  );
}
