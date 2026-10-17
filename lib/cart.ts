"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  /** Price per unit in PHP. */
  price: number;
  image: string;
  imageAlt: string;
  quantity: number;
};

export type CartInput = Omit<CartItem, "quantity">;

export const CART_STORAGE_KEY = "bistro-ph.cart.v1";

type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: CartInput; quantity: number }
  | { type: "remove"; id: string }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "clear" };

function toSafeQuantity(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.floor(parsed));
}

function sanitizeItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const items: CartItem[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const candidate = raw as Record<string, unknown>;
    const id = typeof candidate.id === "string" ? candidate.id : null;
    const name = typeof candidate.name === "string" ? candidate.name : null;
    const price = Number(candidate.price);
    const quantity = toSafeQuantity(candidate.quantity);
    if (!id || !name || !Number.isFinite(price) || price < 0 || quantity < 1) {
      continue;
    }
    items.push({
      id,
      name,
      price,
      quantity,
      image: typeof candidate.image === "string" ? candidate.image : "",
      imageAlt:
        typeof candidate.imageAlt === "string" ? candidate.imageAlt : name,
    });
  }
  return items;
}

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return sanitizeItems(action.items);
    case "add": {
      const addQuantity = Math.max(1, toSafeQuantity(action.quantity) || 1);
      const existing = state.find((item) => item.id === action.item.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + addQuantity }
            : item,
        );
      }
      return [...state, { ...action.item, quantity: addQuantity }];
    }
    case "remove":
      return state.filter((item) => item.id !== action.id);
    case "setQuantity": {
      const quantity = toSafeQuantity(action.quantity);
      if (quantity < 1) {
        return state.filter((item) => item.id !== action.id);
      }
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity } : item,
      );
    }
    case "clear":
      return [];
    default:
      return state;
  }
}

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return sanitizeItems(JSON.parse(raw));
  } catch {
    return [];
  }
}

function writeStoredCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Private browsing or quota exceeded — keep the in-memory state instead.
  }
}

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  total: number;
  isHydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartInput, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const noopSubscribe = () => () => {};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [] as CartItem[]);
  const [isOpen, setIsOpen] = useState(false);
  const isHydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    dispatch({ type: "hydrate", items: readStoredCart() });
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    writeStoredCart(items);
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const addItem = useCallback((item: CartInput, quantity = 1) => {
    dispatch({ type: "add", item, quantity });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "remove", id });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "setQuantity", id, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const item of items) {
      const quantity = toSafeQuantity(item.quantity);
      const price = Number.isFinite(item.price) ? Math.max(0, item.price) : 0;
      count += quantity;
      sum += price * quantity;
    }
    return { itemCount: count, subtotal: Math.max(0, sum) };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      total: subtotal,
      isHydrated,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isHydrated,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    ],
  );

  return createElement(CartContext.Provider, { value }, children);
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
