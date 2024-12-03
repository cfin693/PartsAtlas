export interface Part {
  id: string;
  brand: string;
  partNumber: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  stockLevel: number;
  committed: number;
  unavailable: number;
  location: string;
  image?: File | null;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  reorderPoint: number;
  supplier: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  terms: string;
  active: boolean;
}

export interface Order {
  id: string;
  partId: string;
  supplierId: string;
  quantity: number;
  status: 'Pending' | 'Ordered' | 'Received' | 'Cancelled';
  orderDate: string;
  expectedDelivery: string;
  notes?: string;
}