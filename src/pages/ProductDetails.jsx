import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Star,
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import useProduct from "../hooks/useProduct";
import { useCart } from "../context/CartContext";

const FALLBACK_IMAGE = "https://picsum.photos/800/800?grayscale";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [mainImageSrc, setMainImageSrc] = useState(null);
  const [mainImageLoading, setMainImageLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addedTimeoutRef = useRef(null);

  const { product, loading, error } = useProduct(id);

  // Hooks must run unconditionally, before any early returns.
  useEffect(() => {
    setSelectedImage(0);
    setSelectedColor(0);
    setSelectedSize(null);
    setQuantity(1);
    setJustAdded(false);
  }, [id]);

  useEffect(() => {
    if (product?.images?.length > 0 || product?.image) {
      setMainImageLoading(true);
      setMainImageSrc(
        (product.images && product.images[selectedImage % product.images.length]) ||
          product.image
      );
    }
  }, [product, selectedImage]);

  useEffect(() => {
    return () => window.clearTimeout(addedTimeoutRef.current);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center">
        <p className="font-serif text-2xl font-semibold text-purple-950">
          Product not found
        </p>
        <p className="text-sm text-purple-700">
          The item you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/shop"
          className="mt-2 rounded-xl bg-purple-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-fuchsia-500"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  // `PRODUCTS` was never defined/imported anywhere in this file.
  // Related products should come from the product data itself (or a
  // dedicated hook/fetch); falling back to an empty array keeps the
  // "You may also like" section from crashing when none are provided.
  const related = (product.relatedProducts || product.related || [])
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const colors = product.colors || [];
  const sizes = product.sizes || [];
  const details = product.details || [];

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) return;

    addToCart(product, {
      quantity,
      color: colors[selectedColor]?.name,
      size: selectedSize,
    });

    setJustAdded(true);
    window.clearTimeout(addedTimeoutRef.current);
    addedTimeoutRef.current = window.setTimeout(() => setJustAdded(false), 2000);
  };

  // Use the product's actual image(s) if provided, falling back to a
  // single repeated placeholder so the gallery still has four thumbnails.
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || FALLBACK_IMAGE];

  const thumbnails = Array.from(
    { length: 4 },
    (_, i) => images[i % images.length]
  );

  const activeImage = images[selectedImage % images.length] || FALLBACK_IMAGE;

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
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
          <Link to="/shop" className="transition-colors hover:text-purple-950">
            Shop
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-purple-950">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-purple-100 bg-purple-50">
              {mainImageLoading && (
                <div className="absolute inset-0 animate-pulse bg-purple-100" />
              )}
              <img
                src={mainImageSrc || activeImage}
                alt={product.name}
                onLoad={() => setMainImageLoading(false)}
                onError={(e) => {
                  setMainImageLoading(false);
                  e.currentTarget.onerror = null;
                  setMainImageSrc(FALLBACK_IMAGE);
                }}
                className={`h-full w-full object-cover transition-opacity duration-300 ${
                  mainImageLoading ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((thumbSrc, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square overflow-hidden rounded-xl border transition-all ${
                    selectedImage === i
                      ? "border-fuchsia-400 ring-2 ring-fuchsia-200"
                      : "border-purple-100 hover:border-purple-300"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={thumbSrc}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-purple-500">
              {product.category}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-purple-950">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? "fill-fuchsia-400 text-fuchsia-400"
                        : "fill-purple-100 text-purple-100"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-purple-700">
                {product.rating} ({product.reviewCount ?? 0} reviews)
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-2xl font-semibold text-purple-950">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-purple-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-purple-700">
              {product.description}
            </p>

            {/* Color selector */}
            {colors.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-purple-950">
                  Color:{" "}
                  <span className="font-normal text-purple-700">
                    {colors[selectedColor]?.name}
                  </span>
                </p>
                <div className="flex gap-2">
                  {colors.map((color, i) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(i)}
                      className={`h-9 w-9 rounded-full border-2 transition-all ${
                        selectedColor === i
                          ? "border-fuchsia-400 ring-2 ring-fuchsia-200"
                          : "border-white ring-1 ring-purple-200 hover:ring-purple-300"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-purple-950">Size</p>
                  <button
                    type="button"
                    className="text-xs text-purple-500 underline underline-offset-2 hover:text-purple-950"
                  >
                    Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-purple-950 bg-purple-950 text-white"
                          : "border-purple-200 text-purple-700 hover:border-purple-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-purple-200">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-purple-700 transition-colors hover:text-purple-950"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-medium text-purple-950">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-purple-700 transition-colors hover:text-purple-950"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleAddToCart}
                disabled={sizes.length > 0 && !selectedSize}
                className={`flex-1 rounded-xl py-3.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  justAdded
                    ? "bg-emerald-600 hover:bg-emerald-600"
                    : "bg-purple-950 hover:bg-fuchsia-500 disabled:hover:bg-purple-950"
                }`}
              >
                {sizes.length > 0 && !selectedSize
                  ? "Select a size"
                  : justAdded
                  ? "Added to cart ✓"
                  : "Add to cart"}
              </motion.button>

              <button
                type="button"
                onClick={() => setIsWishlisted((v) => !v)}
                className="rounded-xl border border-purple-200 p-3.5 text-purple-700 transition-colors hover:border-purple-400 hover:text-purple-950"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isWishlisted ? "fill-fuchsia-400 text-fuchsia-400" : ""
                  }`}
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-purple-100 pt-6 text-center">
              <TrustBadge icon={Truck} label="Free shipping over $150" />
              <TrustBadge icon={RotateCcw} label="30-day returns" />
              <TrustBadge icon={ShieldCheck} label="Secure checkout" />
            </div>

            {/* Accordion */}
            <div className="mt-8 divide-y divide-purple-100 border-t border-purple-100">
              <Accordion
                title="Description"
                isOpen={openSection === "description"}
                onToggle={() =>
                  setOpenSection(openSection === "description" ? null : "description")
                }
              >
                <p className="text-sm leading-relaxed text-purple-700">
                  {product.description}
                </p>
              </Accordion>

              <Accordion
                title="Details and care"
                isOpen={openSection === "details"}
                onToggle={() =>
                  setOpenSection(openSection === "details" ? null : "details")
                }
              >
                <ul className="space-y-1.5">
                  {details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-sm text-purple-700">
                      <span className="text-fuchsia-400">-</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion
                title="Shipping and returns"
                isOpen={openSection === "shipping"}
                onToggle={() =>
                  setOpenSection(openSection === "shipping" ? null : "shipping")
                }
              >
                <p className="text-sm leading-relaxed text-purple-700">
                  Orders ship within 1-2 business days. Free standard shipping on
                  orders over $150. Returns are accepted within 30 days of delivery
                  for a full refund, provided items are unworn with tags attached.
                </p>
              </Accordion>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 font-serif text-xl font-semibold text-purple-950">
              You may also like
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <RelatedProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TrustBadge({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <Icon className="h-4 w-4 text-purple-500" />
      <span className="text-[11px] leading-tight text-purple-500">{label}</span>
    </div>
  );
}

function Accordion({ title, isOpen, onToggle, children }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-purple-950"
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 text-purple-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
}

function RelatedProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-2xl border border-purple-100 bg-purple-50 transition-colors group-hover:border-purple-300">
        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-sm font-medium text-purple-950">{product.name}</p>
      <p className="text-sm text-purple-500">${product.price.toFixed(2)}</p>
    </Link>
  );
}