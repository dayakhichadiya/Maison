import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductGrid from "../../components/product/ProductGrid";
import FilterBar from "../../components/product/FilterBar";
import { products } from "../../data/products";

export default function ProductsPage() {
  const router = useRouter();
  const { category, tag, search } = router.query;

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    if (category) setActiveCategory(category);
    else setActiveCategory("All");
  }, [category]);

  useEffect(() => {
    let result = [...products];

    // Category filter
    if (activeCategory && activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Tag filter
    if (tag) {
      result = result.filter((p) => p.tag === tag);
    }

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = result.filter((p) => p.tag === "New").concat(result.filter((p) => p.tag !== "New"));
        break;
      default:
        break;
    }

    setFiltered(result);
  }, [activeCategory, sortBy, tag, search]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    const query = { ...router.query };
    if (cat === "All") {
      delete query.category;
    } else {
      query.category = cat;
    }
    router.push({ pathname: "/products", query }, undefined, { shallow: true });
  };

  const pageTitle = tag
    ? `${tag} — Maison`
    : search
    ? `Search: "${search}" — Maison`
    : activeCategory !== "All"
    ? `${activeCategory} — Maison`
    : "Shop All — Maison";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <div className="mb-10 pb-8 border-b border-stone-200">
          {search ? (
            <>
              <p className="section-subtitle mb-2">Search results</p>
              <h1 className="section-title">"{search}"</h1>
              <p className="text-stone-500 text-sm mt-2">{filtered.length} results found</p>
            </>
          ) : tag ? (
            <>
              <p className="section-subtitle mb-2">Collection</p>
              <h1 className="section-title">{tag}</h1>
            </>
          ) : (
            <>
              <p className="section-subtitle mb-2">The full collection</p>
              <h1 className="section-title">
                {activeCategory === "All" ? "All Products" : activeCategory}
              </h1>
            </>
          )}
        </div>

        {/* Filters */}
        {!search && (
          <FilterBar
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCount={filtered.length}
          />
        )}

        {/* Grid */}
        <ProductGrid products={filtered} />
      </div>
    </>
  );
}
