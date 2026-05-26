import Link from "next/link";
import { Building2 } from "lucide-react";
import { Nav } from "@/components/nav";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getCurrentSession } from "@/utils/server-auth";

export async function Header() {
  const session = await getCurrentSession();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-md border bg-card shadow-xs">
              <Building2 size={16} />
            </span>
            <span>Renovation Manager</span>
          </Link>
          {session ? <Nav role={session.role} /> : null}
        </div>
        {session ? (
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-md border bg-card px-3 py-1.5 shadow-xs">
              {session.name} / {session.role}
            </span>
            <SignOutButton />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <Link className="text-sm font-medium text-muted-foreground hover:text-foreground" href="/signin">
              Sign In
            </Link>
            <Link
              className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-white shadow-xs hover:bg-primary/90"
              href="/signup"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
