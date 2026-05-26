import { adminPageTitles } from "@/constants/admin-pages";

type IProps = {
  path: string;
  section: string;
};

export function DataManagementPage({ path, section }: IProps) {
  const title = adminPageTitles[path] ?? "Data Management";

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-foreground">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{section}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
      </div>

      <section className="mt-8 rounded-lg border bg-card p-6 text-card-foreground shadow-xs">
        <p className="text-sm text-muted-foreground">
          Admin-only dropdown data management workspace.
        </p>
      </section>
    </main>
  );
}
