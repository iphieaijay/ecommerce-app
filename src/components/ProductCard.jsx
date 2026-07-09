import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const FALLBACK_IMAGE = "https://picsum.photos/400/500?grayscale";

export default function ProductCard({ product, index = 0 }) {
  const [imageSrc, setImageSrc] = useState(product.image || FALLBACK_IMAGE);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewDetails = () => {
  navigate(`/product/${product.id}`);
};

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

        {/* Center Hover Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-brand-950/0 opacity-0 transition-all duration-300 group-hover:bg-brand-950/50 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleViewDetails}
            aria-label={`View details for ${product.name}`}
            className="flex translate-y-3 flex-col items-center gap-2 text-white opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-950 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-white">
              <Eye className="h-6 w-6" strokeWidth={2} />
            </span>
            <span className="text-sm font-semibold tracking-wide">
              View Details
            </span>
          </button>
        </div>
      </div>

     
    </motion.article>
  );
}