export type Material = {
  id?: string;
  name: string;
  price: number;
  unit: string;
  unitCost?: number;
  description?: string;
};

export type MaterialInput = {
  name: string;
  price: number;
  unit: string;
  description?: string;
};

export type MaterialUsage = {
  id?: string;
  orderId: string;
  materialId: string;
  usedQuantity: number;
  plannedQuantity: number;
  priceSnapshot: number;
  materialName?: string;
  materialUnit?: string;
  orderNumber?: string;
};

export type MaterialUsageInput = {
  orderId: string;
  materialId: string;
  usedQuantity: number;
  plannedQuantity: number;
  priceSnapshot?: number;
};
