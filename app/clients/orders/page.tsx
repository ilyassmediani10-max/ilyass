export default function ClientOrdersPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Clients</p>
          <h1 className="text-3xl font-bold">Client Orders</h1>
        </div>
        <p className="text-sm text-slate-500">No order details added yet</p>
      </div>

      <section className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <h2 className="text-lg font-semibold">No client orders</h2>
        <p className="mt-2 text-sm text-slate-500">
          This page is empty until order records are added.
        </p>
      </section>
    </main>
  );
}
