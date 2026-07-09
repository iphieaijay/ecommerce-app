import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "cart";

function readInitialCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// A cart "line" is uniquely identified by product id + color + size,
// so the same product in a different variant gets its own row.
function lineKey({ id, color, size }) {
  return [id, color ?? "", size ?? ""].join("::");
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitialCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage may be unavailable (private mode, SSR, etc.) — ignore.
    }
  }, [items]);

  const addToCart = (product, { quantity = 1, color, size } = {}) => {
    setItems((prev) => {
      const key = lineKey({ id: product.id, color, size });
      const existing = prev.find((line) => line.key === key);

      if (existing) {
        return prev.map((line) =>
          line.key === key
            ? { ...line, quantity: line.quantity + quantity }
            : line
        );
      }

      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || (product.images && product.images[0]),
          color,
          size,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((line) => line.key !== key));
  };

  const updateQuantity = (key, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.key !== key)
        : prev.map((line) => (line.key === key ? { ...line, quantity } : line))
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items]
  );

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return ctx;
}