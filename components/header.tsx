import Link from "next/link";
import { Nav } from "@/components/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 text-slate-950 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <Link href="/" className="text-lg font-semibold text-slate-950">
            Renovation Manager
          </Link>
          <Nav />
        </div>
      </div>
    </header>
  );
}
