import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "lucide-react";

import { useCart } from "../context/CartContext";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link
      to="/cart"
      aria-label={`View cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-purple-700 transition-colors hover:bg-purple-50 hover:text-purple-950"
    >
      <ShoppingCartIcon className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[10px] font-semibold leading-none text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}