export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-full border border-brand-200 bg-white py-3 pl-11 pr-4 text-sm text-brand-950 outline-none transition focus:border-brand-500 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-50"
      />
    </div>
  );
}