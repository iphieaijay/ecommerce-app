import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, X, ShoppingBag, ChevronRight } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


 
const FALLBACK_IMAGE = "https://picsum.photos/200/200?grayscale";
const FREE_SHIPPING_THRESHOLD = 150;

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
 const navigate = useNavigate();
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 py-24 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50">
              <ShoppingBag className="h-7 w-7 text-purple-400" />
            </div>
            <p className="font-serif text-2xl font-semibold text-purple-950">
              Your cart is empty
            </p>
            <p className="max-w-sm text-sm text-purple-700">
              Items you add to your cart will show up here. Take a look
              around and find something you like.
            </p>
            <Link
              to="/shop"
              className="mt-2 rounded-xl bg-purple-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-500"
            >
              Continue shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb />

        <motion.h1
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 font-serif text-3xl font-semibold text-purple-950"
        >
          Your cart
        </motion.h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Line items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-purple-100 border-y border-purple-100">
              <AnimatePresence initial={false}>
                {items.map((line) => (
                  <CartLine
                    key={line.key}
                    line={line}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </AnimatePresence>
            </div>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-purple-700 transition-colors hover:text-purple-950"
            >
              Continue shopping
            </Link>
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-fit rounded-2xl border border-purple-100 bg-purple-50/50 p-6"
          >
            <h2 className="font-serif text-lg font-semibold text-purple-950">
              Order summary
            </h2>

            <div className="mt-4 space-y-2 border-b border-purple-100 pb-4 text-sm">
              <div className="flex items-center justify-between text-purple-700">
                <span>Subtotal</span>
                <span className="font-medium text-purple-950">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-purple-700">
                <span>Shipping</span>
                <span>
                  {remainingForFreeShipping === 0 ? "Free" : "Calculated at checkout"}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="font-serif text-base font-semibold text-purple-950">
                Total
              </span>
              <span className="font-serif text-xl font-semibold text-purple-950">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {remainingForFreeShipping > 0 && (
              <p className="mt-3 text-xs text-purple-500">
                Add ${remainingForFreeShipping.toFixed(2)} more to qualify
                for free shipping.
              </p>
            )}

             <motion.button
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={() => navigate("/checkout")}
      className="mt-6 w-full rounded-xl bg-purple-950 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-500"
    >
      Checkout
    </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CartLine({ line, onUpdateQuantity, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 py-6"
    >
      <div className="h-24 w-24 flex-none overflow-hidden rounded-xl border border-purple-100 bg-purple-50 sm:h-28 sm:w-28">
        <img
          src={line.image || FALLBACK_IMAGE}
          alt={line.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-purple-950">{line.name}</p>
            {(line.color || line.size) && (
              <p className="mt-1 text-xs text-purple-500">
                {[line.color, line.size].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onRemove(line.key)}
            aria-label={`Remove ${line.name} from cart`}
            className="rounded-lg p-1.5 text-purple-400 transition-colors hover:bg-purple-100 hover:text-purple-950"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex items-center rounded-xl border border-purple-200">
            <button
              type="button"
              onClick={() => onUpdateQuantity(line.key, line.quantity - 1)}
              className="p-2.5 text-purple-700 transition-colors hover:text-purple-950"
              aria-label={`Decrease quantity of ${line.name}`}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center text-sm font-medium text-purple-950">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(line.key, line.quantity + 1)}
              className="p-2.5 text-purple-700 transition-colors hover:text-purple-950"
              aria-label={`Increase quantity of ${line.name}`}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="font-serif text-base font-semibold text-purple-950">
            ${(line.price * line.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Breadcrumb() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-purple-500"
    >
      <Link to="/" className="transition-colors hover:text-purple-950">
        Home
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-purple-950">Cart</span>
    </motion.nav>
  );
}