import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { api, getErrorMessage } from "../lib/api";
import type { Cart } from "../lib/types";
import { useAuth } from "./AuthContext";

type CartContextValue = {
  cart: Cart | null;
  loading: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get("/cart");
      setCart(data.cart);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = async (productId: string, quantity = 1) => {
    if (!user) {
      toast.error("Please sign in to add items to your cart");
      throw new Error("not authenticated");
    }
    try {
      const { data } = await api.post("/cart/items", { productId, quantity });
      setCart(data.cart);
      toast.success("Added to cart");
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    }
  };

  const updateItem = async (productId: string, quantity: number) => {
    const { data } = await api.put(`/cart/items/${productId}`, { quantity });
    setCart(data.cart);
  };

  const removeItem = async (productId: string) => {
    const { data } = await api.delete(`/cart/items/${productId}`);
    setCart(data.cart);
  };

  const clearCart = async () => {
    await api.delete("/cart");
    setCart((c) => (c ? { ...c, items: [] } : c));
  };

  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const subtotal = cart?.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{ cart, loading, itemCount, subtotal, addItem, updateItem, removeItem, clearCart, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
