import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      aria-pressed={isDark}
      className="relative flex h-8 w-14 shrink-0 items-center rounded-full bg-brand-800 p-1 outline-none ring-brand-300 transition-colors focus-visible:ring-2"
    >
      <motion.span
        className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 shadow-md"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Moon className="h-3.5 w-3.5 text-brand-900" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-brand-700" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}