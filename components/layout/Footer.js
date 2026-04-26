import Link from "next/link";
import { Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 mt-24">
      {/* Newsletter bar */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl text-cream font-light">Stay in the edit.</h3>
              <p className="text-stone-500 text-sm mt-1">New arrivals, exclusive offers, and style notes.</p>
            </div>
            {subscribed ? (
              <p className="text-accent text-sm tracking-wide">Thank you — you're on the list.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-0 w-full md:w-auto max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-stone-800 border border-stone-700 text-cream text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-600"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-amber-600 transition-colors px-5 py-3 text-white"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="block">
              <span className="font-display text-2xl tracking-[0.15em] text-cream uppercase font-light">Maison</span>
            </Link>
            <p className="text-stone-500 text-sm mt-4 leading-relaxed max-w-[200px]">
              Thoughtfully crafted essentials for a life well-lived.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="text-stone-600 hover:text-accent transition-colors" aria-label="social">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-500 mb-5">Shop</h4>
            <ul className="space-y-3 text-sm">
              {["New Arrivals", "Knitwear", "Outerwear", "Dresses", "Trousers", "Accessories", "Sale"].map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-stone-400 hover:text-cream transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-500 mb-5">Help</h4>
            <ul className="space-y-3 text-sm">
              {["Sizing Guide", "Shipping & Returns", "Care Instructions", "Contact Us", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-stone-400 hover:text-cream transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-500 mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {["Our Story", "Sustainability", "Craftsmanship", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-stone-400 hover:text-cream transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-600 text-xs">© 2025 Maison. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-stone-600">
            <a href="#" className="hover:text-stone-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
