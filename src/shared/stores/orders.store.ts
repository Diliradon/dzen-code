/* eslint-disable no-magic-numbers */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Product } from '../../entities/products';

export interface OrderItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  date: string;
  itemCount: number;
}

interface OrdersState {
  orders: Order[];
  currentCart: OrderItem[];

  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  createOrder: (customer: string, email: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  clearOrders: () => void;

  getCartTotal: () => number;
  getCartItemCount: () => number;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
}

const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36);

  return `ORD-${timestamp}-${randomStr}`.toUpperCase();
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentCart: [],

      addToCart: (product: Product, quantity = 1) => {
        if (product.status === 'out-of-stock') {
          return;
        }

        set(state => {
          const existingItem = state.currentCart.find(
            cartItem => cartItem.product.id === product.id,
          );

          if (existingItem) {
            // Update quantity if item already exists
            const maxQuantity = Math.min(
              existingItem.quantity + quantity,
              product.stock,
            );

            return {
              currentCart: state.currentCart.map(cartItem =>
                cartItem.product.id === product.id
                  ? { ...cartItem, quantity: maxQuantity }
                  : cartItem,
              ),
            };
          }

          // Add new item to cart
          const newItem: OrderItem = {
            product,
            quantity: Math.min(quantity, product.stock),
            addedAt: new Date().toISOString(),
          };

          return {
            currentCart: [...state.currentCart, newItem],
          };
        });
      },

      removeFromCart: (productId: number) => {
        set(state => ({
          currentCart: state.currentCart.filter(
            cartItem => cartItem.product.id !== productId,
          ),
        }));
      },

      updateCartQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);

          return;
        }

        set(state => ({
          currentCart: state.currentCart.map(cartItem =>
            cartItem.product.id === productId
              ? {
                  ...cartItem,
                  quantity: Math.min(quantity, cartItem.product.stock),
                }
              : cartItem,
          ),
        }));
      },

      clearCart: () => {
        set({ currentCart: [] });
      },

      createOrder: (customer: string, email: string) => {
        const { currentCart } = get();

        if (currentCart.length === 0) {
          return;
        }

        const total = get().getCartTotal();
        const itemCount = get().getCartItemCount();

        const newOrder: Order = {
          id: generateOrderId(),
          customer,
          email,
          status: 'pending',
          total,
          itemCount,
          items: [...currentCart],
          // eslint-disable-next-line newline-per-chained-call
          date: new Date().toISOString().split('T')[0],
        };

        set(state => ({
          orders: [newOrder, ...state.orders],
          currentCart: [],
        }));
      },

      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order,
          ),
        }));
      },

      getCartTotal: () => {
        const { currentCart } = get();

        return currentCart.reduce(
          (total, cartItem) =>
            total + cartItem.product.price * cartItem.quantity,
          0,
        );
      },

      getCartItemCount: () => {
        const { currentCart } = get();

        return currentCart.reduce(
          (count, cartItem) => count + cartItem.quantity,
          0,
        );
      },

      getOrderById: (orderId: string) => {
        const { orders } = get();

        return orders.find(order => order.id === orderId);
      },

      getOrdersByStatus: (status: Order['status']) => {
        const { orders } = get();

        return orders.filter(order => order.status === status);
      },

      clearOrders: () => {
        set({ orders: [] });
      },
    }),
    {
      name: 'orders-storage',
      partialize: state => ({
        orders: state.orders,
        currentCart: state.currentCart,
      }),
    },
  ),
);
