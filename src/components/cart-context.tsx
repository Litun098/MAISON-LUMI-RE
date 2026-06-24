"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/lib/types";
import { products } from "@/lib/products";

const STORAGE_KEY = "ml-cart-v2";
export const FREE_SHIPPING_THRESHOLD = 750;

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  giftNote: string;
  setGiftNote: (note: string) => void;
  addItem: (
    productId: string,
    size: string,
    color: string,
    quantity?: number,
  ) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [giftNote, setGiftNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from storage once on mount (intentional client-only read).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
      const note = localStorage.getItem(`${STORAGE_KEY}-note`);
      if (note) setGiftNote(note);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
      localStorage.setItem(`${STORAGE_KEY}-note`, giftNote);
    } catch {
      /* storage unavailable */
    }
  }, [lines, giftNote, hydrated]);

  // Lock scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const addItem = useCallback(
    (productId: string, size: string, color: string, quantity = 1) => {
      setLines((prev) => {
        const idx = prev.findIndex(
          (l) =>
            l.productId === productId && l.size === size && l.color === color,
        );
        if (idx > -1) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
          return next;
        }
        return [...prev, { productId, size, color, quantity }];
      });
      setIsOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      setLines((prev) =>
        quantity <= 0
          ? prev.filter(
              (l) =>
                !(
                  l.productId === productId &&
                  l.size === size &&
                  l.color === color
                ),
            )
          : prev.map((l) =>
              l.productId === productId && l.size === size && l.color === color
                ? { ...l, quantity }
                : l,
            ),
      );
    },
    [],
  );

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      setLines((prev) =>
        prev.filter(
          (l) =>
            !(l.productId === productId && l.size === size && l.color === color),
        ),
      );
    },
    [],
  );

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((sum, l) => {
      const product = products.find((p) => p.id === l.productId);
      return sum + (product ? product.price * l.quantity : 0);
    }, 0);
    return {
      lines,
      isOpen,
      count,
      subtotal,
      giftNote,
      setGiftNote,
      addItem,
      updateQuantity,
      removeItem,
      clear: () => setLines([]),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [lines, isOpen, giftNote, addItem, updateQuantity, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
