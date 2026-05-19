export default function ClientOrdersPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 text-slate-950">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Clients</p>
          <h1 className="text-3xl font-bold">Client Orders</h1>
        </div>
      </div>

      <section className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600 md:grid-cols-[1fr_1.2fr_1fr_1fr_1fr]">
          <span>Order</span>
          <span>Service</span>
          <span>Deadline</span>
          <span>Price</span>
          <span>Status</span>
        </div>
        <div className="h-56" />
      </section>
    </main>
  );
}
