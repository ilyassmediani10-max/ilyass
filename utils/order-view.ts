import type { Order } from "@/types/order-t";

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function toDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function showDate(value: string) {
  const date = toDate(value);

  if (!date) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function isExpiredOrder(order: Order) {
  const deadline = toDate(order.deadline);
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return Boolean(deadline && deadline < start && order.status !== "Completed");
}

export function isOrderExpiringThisMonth(order: Order) {
  const deadline = toDate(order.deadline);
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  return Boolean(deadline && deadline >= start && deadline < end && order.status !== "Completed");
}
