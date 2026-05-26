import { adminPageTitles } from "@/constants/admin-pages";

type IProps = {
  path: string;
  section: string;
};

export function DataManagementPage({ path, section }: IProps) {
  const title = adminPageTitles[path] ?? "Data Management";

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
      <div>
        <p className="text-sm font-medium text-blue-600">{section}</p>
        <h1 className="mt-1 text-3xl font-bold">{title}</h1>
      </div>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Admin-only dropdown data management workspace.
        </p>
      </section>
    </main>
  );
}
