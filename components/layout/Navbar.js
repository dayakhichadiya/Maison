import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [router.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: "New Arrivals", href: "/products?tag=New" },
    { label: "Shop All", href: "/products" },
    { label: "Knitwear", href: "/products?category=Knitwear" },
    { label: "Outerwear", href: "/products?category=Outerwear" },
    { label: "Sale", href: "/products?tag=Sale" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-cream"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-display text-2xl md:text-3xl font-light tracking-[0.15em] text-stone-900 uppercase">
                Maison
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs tracking-widest uppercase text-stone-600 hover:text-stone-900 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4 md:gap-5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1 text-stone-700 hover:text-stone-900 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <Link
                href="/cart"
                className="relative p-1 text-stone-700 hover:text-stone-900 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            searchOpen ? "max-h-16 border-t border-stone-200" : "max-h-0"
          }`}
        >
          <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                autoFocus={searchOpen}
                className="w-full pl-10 pr-4 py-2 bg-stone-100 text-stone-800 text-sm rounded-none border-b border-stone-300 focus:outline-none focus:border-stone-800 transition-colors"
              />
            </div>
          </form>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-stone-900/40" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-cream transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-8 pt-20">
            <p className="text-xs tracking-widest text-stone-400 uppercase mb-6">Menu</p>
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xl font-display font-light text-stone-800 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
