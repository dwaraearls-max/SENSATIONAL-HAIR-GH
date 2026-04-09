"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { Product } from "@/types/catalog";

export type CartLine = {
  productId: string;
  name: string;
  image: string;
  priceGhs: number;
  qty: number;
};

type CartState = { items: CartLine[] };

type Action =
  | { type: "ADD"; product: Omit<CartLine, "qty">; qty?: number }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QTY"; productId: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartLine[] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const qty = action.qty ?? 1;
      const idx = state.items.findIndex(
        (i) => i.productId === action.product.productId,
      );
      if (idx === -1) {
        return { items: [...state.items, { ...action.product, qty }] };
      }
      const next = [...state.items];
      next[idx] = { ...next[idx], qty: next[idx].qty + qty };
      return { items: next };
    }
    case "REMOVE":
      return {
        items: state.items.filter((i) => i.productId !== action.productId),
      };
    case "SET_QTY": {
      if (action.qty < 1) {
        return {
          items: state.items.filter((i) => i.productId !== action.productId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, qty: action.qty } : i,
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

const STORAGE_KEY = "sensationalhair-cart-v1";

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotalGhs: number;
  addFromProduct: (p: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartCtx = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) dispatch({ type: "HYDRATE", items: parsed });
      }
    } catch {
      /* ignore */
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state.items, ready]);

  const addFromProduct = useCallback((p: Product, qty = 1) => {
    const priceGhs = p.priceGhs ?? 0;
    dispatch({
      type: "ADD",
      product: {
        productId: p.id,
        name: p.name,
        image: p.image,
        priceGhs,
      },
      qty,
    });
  }, []);

  const remove = useCallback((productId: string) => {
    dispatch({ type: "REMOVE", productId });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    dispatch({ type: "SET_QTY", productId, qty });
  }, []);

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const value = useMemo(() => {
    const subtotalGhs = state.items.reduce(
      (s, i) => s + i.priceGhs * i.qty,
      0,
    );
    const itemCount = state.items.reduce((s, i) => s + i.qty, 0);
    return {
      items: state.items,
      itemCount,
      subtotalGhs,
      addFromProduct,
      remove,
      setQty,
      clear,
    };
  }, [state.items, addFromProduct, remove, setQty, clear]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
