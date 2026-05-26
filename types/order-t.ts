export type OrderMaterial = {
  materialId: string;
  name: string;
  unit: string;
  quantity: number;
  unitCost: number;
};

export type Order = {
  id?: string;
  number: string;
  clientId: string;
  clientNumber?: string;
  clientName?: string;
  service: string;
  orderDate: string;
  deadline: string;
  price: number;
  status: string;
  materials: OrderMaterial[];
};

export type OrderInput = {
  number: string;
  clientId: string;
  service: string;
  orderDate: string;
  deadline: string;
  price: number;
  status: string;
};

export type MaterialRequirement = {
  materialId: string;
  name: string;
  unit: string;
  quantity: number;
  totalCost: number;
};

export type OrderQuerySummary = {
  orders: Order[];
  expiredOrders: Order[];
  expiringThisMonth: Order[];
  materialRequirements: MaterialRequirement[];
};
