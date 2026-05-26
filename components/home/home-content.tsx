import Link from "next/link";
import Image from "next/image";
import { ClipboardList, Hammer, UsersRound } from "lucide-react";
import type { UserRole } from "@/types/auth-t";
import { canAccessPath } from "@/utils/access-control";

const quickLinks = [
  {
    href: "/clients",
    icon: UsersRound,
    label: "Clients",
    value: "Manage contacts",
  },
  {
    href: "/clients/orders",
    icon: ClipboardList,
    label: "Orders",
    value: "Track work",
  },
  {
    href: "/clients/details",
    icon: Hammer,
    label: "Materials",
    value: "Plan costs",
  },
];

type IProps = {
  role: UserRole | null;
};

export function HomeContent({ role }: IProps) {
  const visibleLinks = quickLinks.filter((item) => canAccessPath(role, item.href));

  return (
    <main className="text-foreground">
      <section className="relative min-h-[64vh] overflow-hidden border-b">
        <Image
          src="https://images.pexels.com/photos/15124969/pexels-photo-15124969.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Kitchen renovation work in progress"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex min-h-[64vh] w-full max-w-6xl flex-col justify-end px-6 pb-14 pt-20 text-white">
          <p className="text-sm font-medium uppercase text-zinc-200">
            Renovation workspace
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            Renovation Manager
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-100">
            Clients, orders, materials, costs.
          </p>
          {visibleLinks.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={visibleLinks[0].href}
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-sm font-medium shadow-xs transition hover:bg-zinc-100"
                style={{ color: "#18181b" }}
              >
                Open {visibleLinks[0].label}
              </Link>
              {visibleLinks[1] ? (
                <Link
                  href={visibleLinks[1].href}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white/40 bg-white/10 px-5 text-sm font-medium backdrop-blur transition hover:bg-white/20"
                  style={{ color: "#ffffff" }}
                >
                  View {visibleLinks[1].label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {visibleLinks.length > 0 ? (
        <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 py-8 md:grid-cols-3">
          {visibleLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border bg-card p-5 text-card-foreground shadow-xs transition hover:bg-accent"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-md border bg-background">
                    <Icon size={20} />
                  </span>
                </div>
              </Link>
            );
          })}
        </section>
      ) : null}
    </main>
  );
}
