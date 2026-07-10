import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmation() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex max-w-sm flex-col items-center gap-4 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <p className="font-serif text-2xl font-semibold text-purple-950">
          Order placed
        </p>
        <p className="text-sm text-purple-700">
          Thanks for your order. You'll get a confirmation email with your
          order details shortly.
        </p>
        <Link
          to="/"
          className="mt-2 rounded-xl bg-purple-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-500"
        >
          Continue shopping
        </Link>
      </motion.div>
    </div>
  );
}