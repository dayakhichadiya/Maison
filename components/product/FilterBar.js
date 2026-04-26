import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";
import { categories } from "../../data/products";

export default function FilterBar({ activeCategory, onCategoryChange, sortBy, onSortChange, totalCount }) {
  const [showSort, setShowSort] = useState(false);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "newest", label: "Newest" },
  ];

  const currentSort = sortOptions.find((s) => s.value === sortBy)?.label || "Featured";

  return (
    <div className="mb-10">
      {/* Category pills */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-stone-900 text-cream border-stone-900"
                : "border-stone-300 text-stone-600 hover:border-stone-600 hover:text-stone-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort + count row */}
      <div className="flex items-center justify-between border-t border-b border-stone-200 py-3">
        <p className="text-xs text-stone-500">
          <span className="font-medium text-stone-800">{totalCount}</span> products
        </p>
        <div className="relative">
          <button
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-stone-600 hover:text-stone-900 transition-colors"
          >
            <SlidersHorizontal size={14} />
            {currentSort}
            <ChevronDown size={12} className={`transition-transform ${showSort ? "rotate-180" : ""}`} />
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-cream border border-stone-200 shadow-lg z-20">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSortChange(opt.value);
                    setShowSort(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-xs tracking-wide hover:bg-stone-100 transition-colors ${
                    sortBy === opt.value ? "text-accent font-medium" : "text-stone-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
