import type { NavGroup } from "@/types/nav-t";

export const navGroups: NavGroup[] = [
  {
    label: "Clients",
    items: [
      { label: "Client List", href: "/clients" },
      { label: "Client Details", href: "/clients/details" },
      { label: "Client Orders", href: "/clients/orders" },
    ],
  },
  {
    label: "Orders",
    items: [
      { label: "Order List", href: "/orders" },
      { label: "Expired Orders", href: "/orders/expired" },
      { label: "Orders Expiring This Month", href: "/orders/expiring-this-month" },
      { label: "Order Deadlines", href: "/orders/deadlines" },
    ],
  },
  {
    label: "Materials",
    items: [
      { label: "Material List", href: "/materials" },
      { label: "Materials by Order", href: "/materials/by-order" },
      { label: "Material Usage", href: "/materials/usage" },
      { label: "Material Requirements", href: "/materials/requirements" },
    ],
  },
  {
    label: "Costs",
    items: [
      { label: "Order Prices", href: "/costs/order-prices" },
      { label: "Material Costs", href: "/costs/material-costs" },
      { label: "Total Material Costs", href: "/costs/total-material-costs" },
    ],
  },
  {
    label: "Reports",
    items: [
      { label: "Client Report", href: "/reports/clients" },
      { label: "Order Report", href: "/reports/orders" },
      { label: "Material Requirements Report", href: "/reports/material-requirements" },
      { label: "Cost Summary", href: "/reports/cost-summary" },
    ],
  },
];
