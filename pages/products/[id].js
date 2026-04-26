import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Star, ShoppingBag, Heart, ChevronDown, Truck, RefreshCcw, ShieldCheck } from "lucide-react";
import { getProductById, products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Toast from "../../components/ui/Toast";
import ProductCard from "../../components/product/ProductCard";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = getProductById(id);

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  if (router.isFallback || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="font-display text-3xl font-light text-stone-400">Product not found.</p>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes[0] !== "One Size") {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      selectedSize: selectedSize || "One Size",
      selectedColor,
    });
    setShowToast(true);
  };

  const accordionItems = [
    {
      key: "desc",
      label: "Product Details",
      content: product.description,
    },
    {
      key: "care",
      label: "Care Instructions",
      content: "Machine wash cold on a gentle cycle. Lay flat to dry. Do not bleach or tumble dry. Iron on low heat if needed. Dry clean acceptable.",
    },
    {
      key: "shipping",
      label: "Shipping & Returns",
      content: "Free standard shipping on orders over $150. Express delivery available at checkout. Returns accepted within 30 days of delivery — items must be unworn and in original packaging.",
    },
  ];

  return (
    <>
      <Head>
        <title>{product.title} — Maison</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.category, href: `/products?category=${product.category}` },
            { label: product.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* ── Images ── */}
          <div className="flex flex-col-reverse md:flex-row gap-3">
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-24 relative overflow-hidden border-2 transition-all ${
                      activeImage === i ? "border-stone-900" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main image */}
            <div className="flex-1 relative aspect-[3/4] bg-stone-100 overflow-hidden">
              <Image
                src={product.images?.[activeImage] || product.image}
                alt={product.title}
                fill
                className="object-cover transition-opacity duration-300"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.tag && (
                <span
                  className={`absolute top-4 left-4 text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 ${
                    product.tag === "Sale"
                      ? "bg-red-600 text-white"
                      : product.tag === "Bestseller"
                      ? "bg-stone-900 text-cream"
                      : "bg-accent text-white"
                  }`}
                >
                  {product.tag}
                </span>
              )}
              <button
                onClick={() => setLiked(!liked)}
                className="absolute top-4 right-4 w-9 h-9 bg-cream/90 backdrop-blur-sm flex items-center justify-center hover:bg-cream transition-colors"
              >
                <Heart size={16} className={liked ? "fill-red-500 text-red-500" : "text-stone-700"} />
              </button>
            </div>
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl font-light text-stone-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2.5 mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.round(product.rating) ? "fill-accent text-accent" : "text-stone-300"}
                  />
                ))}
              </div>
              <span className="text-xs text-stone-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-5 pb-5 border-b border-stone-200">
              <span className="font-display text-3xl font-light text-stone-900">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-stone-400 line-through">${product.originalPrice}</span>
                  <span className="text-sm text-red-500 font-medium">−{discount}%</span>
                </>
              )}
            </div>

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <p className="text-xs tracking-widest uppercase text-stone-500 mb-3">
                  Colour: <span className="text-stone-800">{selectedColor || "Select"}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs border transition-all ${
                        selectedColor === color
                          ? "border-stone-900 bg-stone-900 text-cream"
                          : "border-stone-300 text-stone-600 hover:border-stone-600"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes[0] !== "One Size" && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className={`text-xs tracking-widest uppercase ${sizeError ? "text-red-500" : "text-stone-500"}`}>
                    Size: <span className="text-stone-800">{selectedSize || (sizeError ? "Please select a size" : "Select")}</span>
                  </p>
                  <button className="text-xs underline text-stone-400 hover:text-stone-700 transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`w-12 h-12 text-sm border transition-all ${
                        selectedSize === size
                          ? "border-stone-900 bg-stone-900 text-cream"
                          : "border-stone-300 text-stone-700 hover:border-stone-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 gap-2"
              >
                <ShoppingBag size={16} />
                Add to Bag
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`w-14 border flex items-center justify-center transition-all ${
                  liked ? "border-red-300 bg-red-50" : "border-stone-300 hover:border-stone-700"
                }`}
              >
                <Heart size={16} className={liked ? "fill-red-500 text-red-500" : "text-stone-600"} />
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col gap-2.5 mt-6 py-5 border-y border-stone-100">
              {[
                { Icon: Truck, text: "Free shipping on orders over $150" },
                { Icon: RefreshCcw, text: "Free returns within 30 days" },
                { Icon: ShieldCheck, text: "Secure & encrypted checkout" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-xs text-stone-500">
                  <Icon size={14} className="text-stone-400" />
                  {text}
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="mt-4 space-y-0 divide-y divide-stone-200">
              {accordionItems.map(({ key, label, content }) => (
                <div key={key}>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === key ? null : key)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-xs tracking-widest uppercase font-medium text-stone-700">{label}</span>
                    <ChevronDown
                      size={16}
                      className={`text-stone-400 transition-transform duration-200 ${openAccordion === key ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === key ? "max-h-48 pb-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm text-stone-500 leading-relaxed">{content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="mt-20 pt-16 border-t border-stone-200">
            <div className="mb-10">
              <p className="section-subtitle mb-2">You may also like</p>
              <h2 className="section-title">Complete the Look</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Toast message="Added to your bag!" show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}
