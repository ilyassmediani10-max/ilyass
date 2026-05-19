import Link from "next/link";

export function AuthNav() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/signin"
        className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
      >
        Sign up
      </Link>
    </div>
  );
}
