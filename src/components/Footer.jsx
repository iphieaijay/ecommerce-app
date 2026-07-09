import { motion } from "motion/react";

const columns = [
  { title: "Shop", items: ["New Arrivals", "Best Sellers", "Sale", "Gift Cards"] },
  { title: "Support", items: ["Contact Us", "Shipping", "Returns", "FAQ"] },
  { title: "Company", items: ["About", "Careers", "Press", "Sustainability"] },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // Footer stays dark purple in both light and dark theme
      className="bg-brand-950 px-6 py-12 text-brand-200"
    >
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <span className="font-serif text-lg font-semibold text-brand-50">
            Lumière
          </span>
          <p className="mt-3 text-sm leading-relaxed text-brand-300">
            Considered goods for a quieter kind of luxury.
          </p>
        </div>

        {columns.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
          >
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-50">
              {col.title}
            </h4>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-brand-300 transition-colors hover:text-brand-50"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-brand-800 pt-6 text-xs text-brand-400">
        © {new Date().getFullYear()} Lumière. All rights reserved.
      </div>
    </motion.footer>
  );
}