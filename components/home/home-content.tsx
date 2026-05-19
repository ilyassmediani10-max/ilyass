export function HomeContent() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10 text-slate-950">
      <h1 className="text-3xl font-bold">Renovation Order System</h1>
      <p className="mt-4 text-slate-600">
        This system stores clients, orders, deadlines, materials, quantities,
        and costs for renovation services.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Stored Data</h2>
        <div className="mt-4 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-medium">Client and order data</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
              <li>Client number</li>
              <li>Client name</li>
              <li>Address</li>
              <li>Order date</li>
              <li>Order price</li>
              <li>Deadline</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">Material usage data</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
              <li>Order number</li>
              <li>Material</li>
              <li>Price</li>
              <li>Used quantity</li>
              <li>Planned quantity</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Queries</h2>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
          <li>Which orders have expired?</li>
          <li>Which orders expire this month?</li>
          <li>Materials used for a specific order</li>
          <li>List of clients</li>
          <li>Total material requirements and costs</li>
        </ul>
      </section>
    </main>
  );
}
