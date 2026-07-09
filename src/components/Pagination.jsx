import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Builds a compact page list like: 1, 2, 3, ..., 8  (with ellipses when needed)
function getPageList(current, total) {
  const pages = [];
  const window = 1; // pages shown on each side of current

  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || (p >= current - window && p <= current + window)) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageList(currentPage, totalPages);

  return (
    <nav
      aria-label="Product pagination"
      className="mt-10 flex items-center justify-center gap-1.5"
    >
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:text-brand-300 dark:hover:bg-brand-900/60"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-brand-400 dark:text-brand-600"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors"
          >
            {p === currentPage && (
              <motion.span
                layoutId="pagination-active"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="absolute inset-0 rounded-full bg-brand-950 dark:bg-brand-50"
              />
            )}
            <span
              className={`relative z-10 ${
                p === currentPage
                  ? "text-brand-50 dark:text-brand-950"
                  : "text-brand-700 hover:text-brand-950 dark:text-brand-300 dark:hover:text-brand-50"
              }`}
            >
              {p}
            </span>
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-full text-brand-700 transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:text-brand-300 dark:hover:bg-brand-900/60"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
