import { useState } from "react";
import { motion } from "motion/react";
import {
  Lock,
  Truck,
  CreditCard,
  Tag,
  ChevronDown,
  ShoppingBag,
  Check,
  ChevronLeft,
} from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Silk Wrap Blouse",
    variant: "Ivory / Size M",
    price: 128,
    qty: 1,
  },
  {
    id: 2,
    name: "Tailored Wool Trousers",
    variant: "Charcoal / Size 30",
    price: 165,
    qty: 1,
  },
  {
    id: 3,
    name: "Leather Ankle Boots",
    variant: "Cognac / Size 8",
    price: 210,
    qty: 1,
  },
];

const shippingOptions = [
  { id: "standard", label: "Standard", eta: "5-7 business days", price: 0 },
  { id: "express", label: "Express", eta: "2-3 business days", price: 18 },
  { id: "overnight", label: "Overnight", eta: "Next business day", price: 34 },
];

export default function CheckoutPage() {
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shippingCost =
    shippingOptions.find((o) => o.id === shippingMethod)?.price ?? 0;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount + shippingCost) * 0.08;
  const total = subtotal - discount + shippingCost + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toLowerCase() === "lumiere10") {
      setPromoApplied(true);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // wire up to your order logic
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center justify-between"
        >
          <a
            href="/cart"
            className="flex items-center gap-1 text-sm text-purple-700 transition-colors hover:text-purple-950"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to cart
          </a>
          <span className="font-serif text-xl font-semibold tracking-tight text-purple-950">
            Lumiere
          </span>
          <div className="flex items-center gap-1.5 text-xs text-purple-500">
            <Lock className="h-3.5 w-3.5" />
            Secure checkout
          </div>
        </motion.div>

        {/* Progress steps */}
        <div className="mb-10 flex items-center justify-center gap-2 text-xs font-medium text-purple-700 sm:gap-4">
          {["Cart", "Information", "Payment"].map((step, i) => (
            <div key={step} className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    i < 2
                      ? "bg-fuchsia-400 text-purple-950"
                      : "border border-purple-300 text-purple-700"
                  }`}
                >
                  {i < 2 ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span className={i === 2 ? "text-purple-950" : ""}>{step}</span>
              </div>
              {i < 2 && <span className="h-px w-6 bg-purple-200 sm:w-10" />}
            </div>
          ))}
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]"
        >
          {/* Left: Form sections */}
          <div className="space-y-6">
            <Section title="Contact" delay={0.05}>
              <Input type="email" name="email" placeholder="Email address" required />
              <label className="flex items-center gap-2 pt-1 text-sm text-purple-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-purple-300 bg-transparent accent-fuchsia-500"
                />
                Email me with news and offers
              </label>
            </Section>

            <Section title="Shipping address" delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                <Input name="firstName" placeholder="First name" required />
                <Input name="lastName" placeholder="Last name" required />
              </div>
              <Input name="address" placeholder="Address" required />
              <Input name="apartment" placeholder="Apartment, suite, etc. (optional)" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Input name="city" placeholder="City" required />
                <Select name="state" required>
                  <option value="">State</option>
                  <option>California</option>
                  <option>New York</option>
                  <option>Texas</option>
                </Select>
                <Input name="zip" placeholder="ZIP code" required />
              </div>
              <Input name="phone" type="tel" placeholder="Phone number" required />
            </Section>

            <Section title="Shipping method" delay={0.15}>
              <div className="space-y-2">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                      shippingMethod === option.id
                        ? "border-fuchsia-400 bg-fuchsia-50"
                        : "border-purple-100 bg-purple-50/40 hover:border-purple-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod === option.id}
                        onChange={() => setShippingMethod(option.id)}
                        className="h-4 w-4 accent-fuchsia-500"
                      />
                      <div>
                        <p className="text-sm font-medium text-purple-950">
                          {option.label}
                        </p>
                        <p className="text-xs text-purple-500">{option.eta}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-purple-950">
                      {option.price === 0 ? "Free" : `$${option.price.toFixed(2)}`}
                    </span>
                  </label>
                ))}
              </div>
            </Section>

            <Section title="Payment" delay={0.2} icon={CreditCard}>
              <Input name="cardNumber" placeholder="Card number" required />
              <div className="grid grid-cols-2 gap-3">
                <Input name="expiry" placeholder="MM / YY" required />
                <Input name="cvc" placeholder="CVC" required />
              </div>
              <Input name="cardName" placeholder="Name on card" required />
              <label className="flex items-center gap-2 pt-1 text-sm text-purple-700">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-purple-300 bg-transparent accent-fuchsia-500"
                />
                Billing address same as shipping
              </label>
            </Section>
          </div>

          {/* Right: Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-fit space-y-6 rounded-3xl border border-purple-100 bg-white/70 p-6 shadow-2xl shadow-purple-200/40 backdrop-blur-2xl lg:sticky lg:top-10"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-purple-500" />
              <h2 className="font-serif text-lg font-semibold text-purple-950">
                Order summary
              </h2>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200">
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-400 text-[10px] font-bold text-purple-950">
                      {item.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-purple-950">
                      {item.name}
                    </p>
                    <p className="text-xs text-purple-500">{item.variant}</p>
                  </div>
                  <span className="text-sm font-medium text-purple-950">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-purple-100 bg-white/60 px-3 py-2.5">
                <Tag className="h-4 w-4 shrink-0 text-purple-400" />
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="w-full bg-transparent text-sm text-purple-950 placeholder-purple-400 outline-none"
                />
              </div>
              <button
                onClick={handleApplyPromo}
                type="button"
                className="rounded-xl border border-purple-100 px-4 text-sm font-medium text-purple-700 transition-colors hover:border-purple-300 hover:text-purple-950"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p className="-mt-3 flex items-center gap-1 text-xs text-fuchsia-600">
                <Check className="h-3.5 w-3.5" />
                Code "LUMIERE10" applied - 10% off
              </p>
            )}

            {/* Totals */}
            <div className="space-y-2 border-t border-purple-100 pt-4 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              {promoApplied && (
                <Row label="Discount" value={`-$${discount.toFixed(2)}`} accent />
              )}
              <Row
                label={
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" />
                    Shipping
                  </span>
                }
                value={shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              />
              <Row label="Tax" value={`$${tax.toFixed(2)}`} />
            </div>

            <div className="flex items-center justify-between border-t border-purple-100 pt-4">
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-950 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-500"
            >
              <Lock className="h-4 w-4" />
              Place order
            </motion.button>

            <p className="text-center text-xs text-purple-500">
              By placing your order you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-2 hover:text-purple-950"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-2 hover:text-purple-950"
              >
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, delay = 0, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="space-y-3 rounded-3xl border border-purple-100 bg-white/50 p-6"
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-purple-500" />}
        <h2 className="font-serif text-base font-semibold text-purple-950">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-purple-100 bg-white/60 px-4 py-3 text-sm text-purple-950 placeholder-purple-400 outline-none transition-colors focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
    />
  );
}

function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none rounded-xl border border-purple-100 bg-white/60 px-4 py-3 text-sm text-purple-950 outline-none transition-colors focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
    </div>
  );
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-purple-700">{label}</span>
      <span className={accent ? "text-fuchsia-600" : "text-purple-950"}>
        {value}
      </span>
    </div>
  );
}