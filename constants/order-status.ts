export enum OrderStatus {
  planning = "Planning",
  scheduled = "Scheduled",
  materialsReady = "Materials ready",
  inProgress = "In progress",
  delayed = "Delayed",
  completed = "Completed",
}

export const orderStatuses = Object.values(OrderStatus);
