import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product, index = 0 }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const staggerClass = `stagger-${Math.min((index % 8) + 1, 8)}`;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className={`group animate-fadeUp opacity-0 ${staggerClass} card-hover`}>
      {/* Image container */}
      <Link href={`/products/${product.id}`} className="block overflow-hidden bg-stone-100 relative aspect-[3/4]">
        {!imgError ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-200">
            <span className="text-stone-400 text-sm">No Image</span>
          </div>
        )}

        {/* Tag badge */}
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase font-medium px-2 py-1 ${
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

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className={`absolute top-3 right-3 w-8 h-8 bg-cream/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-cream ${
            liked ? "opacity-100" : ""
          }`}
          aria-label="Wishlist"
        >
          <Heart
            size={14}
            className={liked ? "fill-red-500 text-red-500" : "text-stone-700"}
          />
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-stone-900/90 py-3 text-center text-cream text-xs tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          Quick View
        </div>
      </Link>

      {/* Info */}
      <div className="pt-4 pb-1">
        <p className="text-[10px] tracking-widest text-stone-400 uppercase mb-1">{product.category}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-stone-900 hover:text-accent transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-medium text-stone-900">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-stone-400 line-through">${product.originalPrice}</span>
              <span className="text-xs text-red-500 font-medium">−{discount}%</span>
            </>
          )}
        </div>
        {/* Stars */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.round(product.rating) ? "fill-accent text-accent" : "text-stone-300"}
              />
            ))}
          </div>
          <span className="text-[10px] text-stone-400">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}
