export type Operator = 'Jio' | 'Airtel' | 'Vi' | 'BSNL' | 'Unknown';

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Plan {
  _id: string;
  operator: Operator;
  price: number;
  validity: string;
  data: string;
  benefits: string[];
  offers?: string;
}

export interface RechargeRecord {
  _id: string;
  userId: string;
  date: string;
  status: 'success' | 'failed' | 'pending';
  operator: Operator;
  amount: number;
  phone: string;
  planId: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PaymentOrderResponse {
  orderId: string;
  key: string;
  amount: number;
  currency: string;
}
