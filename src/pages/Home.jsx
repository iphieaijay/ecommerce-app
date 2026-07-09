import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import CategorySidebar from "../components/CategorySidebar";
import SearchBar from "../components/SearchBar";

const PRODUCTS_PER_PAGE = 12;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=100"),
          fetch("https://dummyjson.com/products/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        // dummyjson's categories endpoint can return either an array of
        // strings or an array of {slug, name, url} objects depending on
        // API version — normalize both to {slug, name}.
        const normalizedCategories = categoriesData.map((cat) =>
          typeof cat === "string"
            ? { slug: cat, name: cat.replace(/-/g, " ") }
            : { slug: cat.slug, name: cat.name }
        );

        setProducts(productsData.products);
        setCategories(normalizedCategories);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Something went wrong loading products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesSearch =
        term === "" ||
        product.title?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.brand?.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [currentPage, filteredProducts]);

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
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="flex-1">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              <p className="whitespace-nowrap text-sm text-brand-500 dark:text-brand-400">
                {filteredProducts.length} result
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
                {error}
              </p>
            )}

            {!error && loading && (
              <p className="py-16 text-center text-brand-500 dark:text-brand-400">
                Loading products...
              </p>
            )}

            {!error && !loading && visibleProducts.length === 0 && (
              <p className="py-16 text-center text-brand-500 dark:text-brand-400">
                No products match your search.
              </p>
            )}

            {!error && !loading && visibleProducts.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentPage}-${selectedCategory}-${searchTerm}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {visibleProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        name: product.title,
                        description: product.description,
                        price: product.price,
                        image: product.thumbnail,
                        tag: product.brand,
                      }}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}