import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronRight, ShieldCheck } from "lucide-react";

import { useCart } from "../context/CartContext";

const FALLBACK_IMAGE = "https://picsum.photos/200/200?grayscale";
const FREE_SHIPPING_THRESHOLD = 150;

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  // If someone lands here with nothing in their cart (empty cart, or a
  // direct visit to /checkout), send them back rather than showing a
  // checkout form for an order with no items.
  if (items.length === 0 && !placingOrder) {
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
            <p className="font-serif text-2xl font-semibold text-purple-950">
              Your cart is empty
            </p>
            <p className="max-w-sm text-sm text-purple-700">
              Add something to your cart before checking out.
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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setPlacingOrder(true);
    // Simulate order submission. Swap this for a real API call when
    // there's a backend/payment provider to submit to.
    setTimeout(() => {
      clearCart();
      navigate("/order-confirmation");
    }, 600);
  };

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
          Checkout
        </motion.h1>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12"
        >
          {/* Shipping + payment */}
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="font-serif text-lg font-semibold text-purple-950">
                Contact
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" autoComplete="name" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
            </section>

            <section>
              <h2 className="font-serif text-lg font-semibold text-purple-950">
                Shipping address
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <Field
                  label="Street address"
                  name="address"
                  autoComplete="street-address"
                  required
                />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <Field label="City" name="city" autoComplete="address-level2" required />
                  <Field label="State" name="state" autoComplete="address-level1" required />
                  <Field label="ZIP code" name="zip" autoComplete="postal-code" required />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-lg font-semibold text-purple-950">
                Payment
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <Field
                  label="Card number"
                  name="cardNumber"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Expiry (MM/YY)"
                    name="expiry"
                    autoComplete="cc-exp"
                    required
                  />
                  <Field label="CVC" name="cvc" inputMode="numeric" autoComplete="cc-csc" required />
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-purple-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                This is a demo checkout — no real payment is processed.
              </p>
            </section>
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

            <ul className="mt-4 max-h-72 space-y-4 overflow-y-auto pr-1">
              {items.map((line) => (
                <li key={line.key} className="flex gap-3">
                  <div className="relative h-14 w-14 flex-none overflow-hidden rounded-lg border border-purple-100 bg-white">
                    <img
                      src={line.image || FALLBACK_IMAGE}
                      alt={line.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-purple-950 px-1 text-[10px] font-semibold text-white">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-sm font-medium text-purple-950">
                      {line.name}
                    </p>
                    {(line.color || line.size) && (
                      <p className="text-xs text-purple-500">
                        {[line.color, line.size].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  <span className="self-center text-sm font-medium text-purple-950">
                    ${(line.price * line.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 border-t border-purple-100 pt-4 text-sm">
              <div className="flex items-center justify-between text-purple-700">
                <span>Subtotal</span>
                <span className="font-medium text-purple-950">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-purple-700">
                <span>Shipping</span>
                <span className="font-medium text-purple-950">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-purple-100 pt-4">
              <span className="font-serif text-base font-semibold text-purple-950">
                Total
              </span>
              <span className="font-serif text-xl font-semibold text-purple-950">
                ${total.toFixed(2)}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={placingOrder}
              className="mt-6 w-full rounded-xl bg-purple-950 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {placingOrder ? "Placing order..." : `Place order · $${total.toFixed(2)}`}
            </motion.button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", ...rest }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-purple-950">{label}</span>
      <input
        name={name}
        type={type}
        {...rest}
        className="w-full rounded-xl border border-purple-200 px-3.5 py-2.5 text-sm text-purple-950 outline-none transition-colors placeholder:text-purple-300 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
      />
    </label>
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
      <Link to="/cart" className="transition-colors hover:text-purple-950">
        Cart
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-purple-950">Checkout</span>
    </motion.nav>
  );
}