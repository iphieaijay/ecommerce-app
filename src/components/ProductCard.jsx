import { motion } from "motion/react";
import { useState } from "react";

const FALLBACK_IMAGE = "https://picsum.photos/400/500?grayscale";

export default function ProductCard({ product, index = 0 }) {
  const [imageSrc, setImageSrc] = useState(product.image || FALLBACK_IMAGE);
  const [loading, setLoading] = useState(true);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
      }}
      whileHover={{ y: -8 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-brand-800 dark:bg-brand-900"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-100 dark:bg-brand-800">
        {product.tag && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-brand-950 px-3 py-1 text-xs font-semibold text-white">
            {product.tag}
          </span>
        )}

        {loading && (
          <div className="absolute inset-0 animate-pulse bg-brand-200 dark:bg-brand-700" />
        )}

        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={(e) => {
            setLoading(false);
            e.currentTarget.onerror = null;
            setImageSrc(FALLBACK_IMAGE);
          }}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold text-brand-950 dark:text-brand-50">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-brand-600 dark:text-brand-400">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-brand-950 dark:text-brand-50">
            ${product.price.toFixed(2)}
          </span>

          {product.tag && (
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-800 dark:text-brand-300">
              {product.tag}
            </span>
          )}
        </div>

        <button className="mt-6 w-full rounded-xl bg-brand-950 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 dark:bg-brand-700 dark:hover:bg-brand-600">
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}