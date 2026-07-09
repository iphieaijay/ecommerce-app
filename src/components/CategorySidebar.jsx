export default function CategorySidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <aside className="w-full shrink-0 sm:w-56">
      <h3 className="mb-3 font-serif text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
        Categories
      </h3>
      <ul className="flex flex-row flex-wrap gap-2 sm:flex-col sm:gap-1">
        <li>
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`w-full rounded-full px-4 py-2 text-left text-sm transition sm:rounded-lg ${
              selectedCategory === "all"
                ? "bg-brand-950 text-brand-50 dark:bg-brand-50 dark:text-brand-950"
                : "text-brand-700 hover:bg-brand-100 dark:text-brand-300 dark:hover:bg-brand-900"
            }`}
          >
            All products
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <button
              type="button"
              onClick={() => onSelectCategory(category.slug)}
              className={`w-full rounded-full px-4 py-2 text-left text-sm capitalize transition sm:rounded-lg ${
                selectedCategory === category.slug
                  ? "bg-brand-950 text-brand-50 dark:bg-brand-50 dark:text-brand-950"
                  : "text-brand-700 hover:bg-brand-100 dark:text-brand-300 dark:hover:bg-brand-900"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}