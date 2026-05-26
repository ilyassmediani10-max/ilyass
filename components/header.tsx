import Link from "next/link";
import { Nav } from "@/components/nav";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getCurrentSession } from "@/utils/server-auth";

export async function Header() {
  const session = await getCurrentSession();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 text-slate-950 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <Link href="/" className="text-lg font-semibold text-slate-950">
            Renovation Manager
          </Link>
          {session ? <Nav role={session.role} /> : null}
        </div>
        {session ? (
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>
              {session.name} / {session.role}
            </span>
            <SignOutButton />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <Link className="text-sm font-medium text-slate-700 hover:text-slate-950" href="/signin">
              Sign In
            </Link>
            <Link
              className="inline-flex h-10 items-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
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
