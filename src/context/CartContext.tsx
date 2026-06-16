import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { TravelPackage } from "@/lib/tourist-data";

export type CartItem = {
  package: TravelPackage;
  countryCode: string;
  countryName: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (packageData: TravelPackage, countryCode: string, countryName: string) => void;
  removeItem: (countryCode: string, packageName: string) => void;
  updateQuantity: (countryCode: string, packageName: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isInCart: (countryCode: string, packageName: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "world-explorer-cart";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setItems(loadCartFromStorage());
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(items);
    }
  }, [items, isInitialized]);

  const addItem = (pkg: TravelPackage, countryCode: string, countryName: string) => {
    setItems((prev) => {
      // Check if item already exists
      const existing = prev.find(
        (i) => i.package.name === pkg.name && i.countryCode === countryCode,
      );
      if (existing) {
        // Increment quantity if exists
        return prev.map((i) =>
          i.package.name === pkg.name && i.countryCode === countryCode
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      // Add new item
      return [...prev, { package: pkg, countryCode, countryName, quantity: 1 }];
    });
  };

  const removeItem = (countryCode: string, packageName: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.countryCode === countryCode && i.package.name === packageName)),
    );
  };

  const updateQuantity = (countryCode: string, packageName: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(countryCode, packageName);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.countryCode === countryCode && i.package.name === packageName ? { ...i, quantity } : i,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.package.price * item.quantity, 0);

  const isInCart = (countryCode: string, packageName: string) => {
    return items.some((i) => i.countryCode === countryCode && i.package.name === packageName);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
