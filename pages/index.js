import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Recycle, Award } from "lucide-react";
import ProductCard from "../components/product/ProductCard";
import { products } from "../data/products";

const featuredProducts = products.slice(0, 4);
const newArrivals = products.filter((p) => p.tag === "New");

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Maison — Thoughtfully Crafted Essentials</title>
      </Head>

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-stone-100">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-stone-900/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-lg">
            <p className="text-xs tracking-[0.3em] text-cream/70 uppercase mb-5 animate-fadeUp opacity-0 stagger-1">
              New Collection — Spring 2025
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-cream leading-[1.05] tracking-tight animate-fadeUp opacity-0 stagger-2">
              Dressed for
              <br />
              <em>every chapter.</em>
            </h1>
            <p className="text-cream/70 text-base mt-6 leading-relaxed max-w-sm animate-fadeUp opacity-0 stagger-3">
              Thoughtfully designed pieces made to last a lifetime. Slow fashion for a considered wardrobe.
            </p>
            <div className="flex flex-wrap gap-4 mt-10 animate-fadeUp opacity-0 stagger-4">
              <Link href="/products" className="btn-primary bg-cream text-stone-900 hover:bg-stone-100">
                Shop the Collection
                <ArrowRight size={15} />
              </Link>
              <Link href="/products?tag=New" className="btn-outline border-cream text-cream hover:bg-cream hover:text-stone-900">
                New Arrivals
              </Link>
            </div>
          </div>
        </div>

        {/* Hero stat strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-stone-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 divide-x divide-stone-700 py-5">
              {[
                { stat: "100%", label: "Natural Fibres" },
                { stat: "30-day", label: "Free Returns" },
                { stat: "1,200+", label: "Happy Customers" },
              ].map(({ stat, label }) => (
                <div key={label} className="text-center px-4">
                  <p className="font-display text-xl text-accent font-light">{stat}</p>
                  <p className="text-[10px] tracking-widest uppercase text-stone-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY TILES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-subtitle mb-2">Browse by category</p>
            <h2 className="section-title">Shop the Edit</h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Knitwear", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", cat: "Knitwear" },
            { label: "Outerwear", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80", cat: "Outerwear" },
            { label: "Dresses", img: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80", cat: "Dresses" },
            { label: "Accessories", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", cat: "Accessories" },
          ].map(({ label, img, cat }, i) => (
            <Link
              key={cat}
              href={`/products?category=${cat}`}
              className={`group relative overflow-hidden bg-stone-200 animate-fadeUp opacity-0 stagger-${i + 1} ${
                i === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={img}
                alt={label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <span className="font-display text-xl md:text-2xl text-cream font-light">{label}</span>
                <ArrowRight size={16} className="text-cream opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-subtitle mb-2">Handpicked for you</p>
            <h2 className="section-title">Best Sellers</h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors">
            Shop All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="text-center mt-12 md:hidden">
          <Link href="/products" className="btn-outline">
            Shop All Products
          </Link>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ── */}
      <section className="my-20 mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-7xl mx-auto relative overflow-hidden bg-stone-900 min-h-[400px] flex items-center">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80"
              alt="Editorial"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="relative px-8 md:px-16 py-16 max-w-xl">
            <p className="text-xs tracking-[0.3em] text-accent uppercase mb-4">The Maison Way</p>
            <h2 className="font-display text-4xl md:text-5xl text-cream font-light leading-tight">
              Less, but better.
            </h2>
            <p className="text-stone-400 mt-5 text-sm leading-relaxed">
              We believe in buying once and buying well. Every piece in our collection is designed with longevity in mind — seasonless, timeless, and crafted to be handed down.
            </p>
            <Link href="/products" className="btn-primary mt-8 inline-flex bg-accent hover:bg-amber-600 border-0">
              Discover the Collection
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-subtitle mb-2">Just landed</p>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <Link href="/products?tag=New" className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors">
            See All New <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
          {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ── VALUES STRIP ── */}
      <section className="bg-stone-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              {
                Icon: Leaf,
                title: "Sustainably Sourced",
                desc: "All materials are ethically sourced from certified suppliers who share our commitment to the planet.",
              },
              {
                Icon: Award,
                title: "Premium Craftsmanship",
                desc: "Every stitch, seam, and finish is held to the highest standard — built to outlast trends and seasons.",
              },
              {
                Icon: Recycle,
                title: "Circular by Design",
                desc: "Our packaging is 100% recyclable and we offer a garment return program for responsible end-of-life.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center">
                <div className="w-12 h-12 border border-stone-700 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="font-display text-xl text-cream font-light mb-3">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
