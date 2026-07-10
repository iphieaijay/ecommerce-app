import { motion } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import {Search, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import CartIcon from "./CartIcon";

const links = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "New Arrivals", path: "/new-arrivals" },
  { name: "Collections", path: "/collections" },
  { name: "Sale", path: "/sale" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-brand-950 px-6 py-4 shadow-brand"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <NavLink
            to="/"
            className="font-serif text-xl font-semibold tracking-tight text-brand-50"
          >
            Lumière
          </NavLink>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden gap-8 md:flex">
          {links.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-50"
                      : "text-brand-200 hover:text-brand-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">         

          <button
            className="text-brand-200 transition-colors hover:text-brand-50"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Cart -> Checkout */}
          {/* <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/checkout")}
            className="relative text-brand-200 transition-colors hover:text-brand-50"
            aria-label="Shopping Cart"
          > */}
           <CartIcon/>

            {/* <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.6,
                type: "spring",
                stiffness: 400,
              }}
              className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-400 text-[10px] font-bold text-brand-950"
            >
              3
            </motion.span> */}
          {/* </motion.button> */}

          {/* Auth Links */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden items-center gap-3 border-l border-brand-800 pl-4 md:flex"
          >
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-brand-50"
                    : "text-brand-200 hover:text-brand-50"
                }`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/auth"
              className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-brand-200"
            >
              Sign Up
            </NavLink>
          </motion.div>
            <ThemeToggle />
          <button
            className="text-brand-200 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}