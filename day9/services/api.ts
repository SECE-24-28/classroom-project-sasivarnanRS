import axios from 'axios';
import { Plan, User, AuthResponse, RechargeRecord, PaymentOrderResponse, Operator } from '../types';
import { MOCK_PLANS, MOCK_HISTORY } from './mockData';

// Simulating network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In a real app, this would be your actual backend URL
const API_BASE_URL = 'http://localhost:5000/api'; 

// Mock user store
let mockUsers: User[] = [
  { _id: 'admin_1', email: 'admin@demo.com', name: 'Admin User', role: 'admin' },
  { _id: 'user_1', email: 'user@demo.com', name: 'Demo User', role: 'user' }
];

let mockPlans = [...MOCK_PLANS];
let mockHistory = [...MOCK_HISTORY];

export const api = {
  auth: {
    login: async (data: any): Promise<AuthResponse> => {
      await delay(800);
      const user = mockUsers.find(u => u.email === data.email);
      // For demo: verify password roughly (in real app, backend handles this)
      if (user && data.password.length >= 8) {
         return { token: 'mock-jwt-token-xyz', user };
      }
      throw new Error('Invalid credentials');
    },
    register: async (data: any): Promise<AuthResponse> => {
      await delay(800);
      const newUser: User = { 
        _id: `user_${Date.now()}`, 
        email: data.email, 
        name: data.email.split('@')[0], 
        role: 'user' 
      };
      mockUsers.push(newUser);
      return { token: 'mock-jwt-token-new', user: newUser };
    }
  },
  plans: {
    getAll: async (operator?: Operator): Promise<Plan[]> => {
      await delay(500);
      if (operator) {
        return mockPlans.filter(p => p.operator === operator);
      }
      return mockPlans;
    },
    // Admin functions
    create: async (plan: Omit<Plan, '_id'>): Promise<Plan> => {
      await delay(600);
      const newPlan = { ...plan, _id: `plan_${Date.now()}` };
      mockPlans.push(newPlan);
      return newPlan;
    },
    update: async (id: string, updates: Partial<Plan>): Promise<Plan> => {
        await delay(600);
        const idx = mockPlans.findIndex(p => p._id === id);
        if (idx === -1) throw new Error("Plan not found");
        mockPlans[idx] = { ...mockPlans[idx], ...updates };
        return mockPlans[idx];
    },
    delete: async (id: string): Promise<void> => {
        await delay(600);
        mockPlans = mockPlans.filter(p => p._id !== id);
    }
  },
  recharge: {
    createOrder: async (amount: number): Promise<PaymentOrderResponse> => {
      await delay(1000);
      return {
        orderId: `order_${Date.now()}`,
        key: 'rzp_test_123456789', // Mock key
        amount: amount * 100,
        currency: 'INR'
      };
    },
    verifyPayment: async (paymentData: any): Promise<boolean> => {
      await delay(1500);
      return true; // Always succeed in demo
    },
    record: async (data: Partial<RechargeRecord>): Promise<RechargeRecord> => {
      await delay(500);
      const record: RechargeRecord = {
        _id: `rec_${Date.now()}`,
        date: new Date().toISOString(),
        status: 'success',
        userId: data.userId || 'guest',
        planId: data.planId || '',
        operator: data.operator as Operator,
        amount: data.amount || 0,
        phone: data.phone || ''
      };
      mockHistory.unshift(record);
      return record;
    },
    getHistory: async (userId: string): Promise<RechargeRecord[]> => {
        await delay(700);
        return mockHistory.filter(h => h.userId === userId);
    }
  },
  stats: {
    getDashboard: async () => {
        await delay(500);
        return {
            totalUsers: mockUsers.length,
            totalRevenue: mockHistory.reduce((acc, curr) => acc + curr.amount, 0),
            totalRecharges: mockHistory.length
        };
    }
  }
};
