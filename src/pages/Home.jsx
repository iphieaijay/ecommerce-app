import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const PRODUCTS_PER_PAGE = 12;
export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts]=useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
        .then(res => res.json())
        .then(data => setProducts(data.products));
}, []);

  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return products.slice(start, start + PRODUCTS_PER_PAGE);
  }, [currentPage, products]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="px-6 py-20 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl"
        >
          Quiet luxury, made to last
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-4 max-w-md text-brand-700 dark:text-brand-300"
        >
          Considered pieces in a refined dark purple palette, built to move
          with your day and your mood.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 rounded-full bg-brand-950 px-7 py-3 text-sm font-semibold text-brand-50 shadow-brand dark:bg-brand-50 dark:text-brand-950"
        >
          Shop the collection
        </motion.button>
      </motion.section>

      <section className="px-6 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mx-auto grid max-w-6xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
          >
            {visibleProducts.map((product, index) => (
              <ProductCard key={product.name} 
              product={{
                id: product.id,
                name: product.title,
                description: product.description,
                price: product.price,
                image: product.thumbnail,
                tag: product.brand
            }}
              index={index} />
              
            ))}
          </motion.div>
        </AnimatePresence>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}
