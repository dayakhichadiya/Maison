import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart();
  const [imgError, setImgError] = useState(false);

  const handleQtyChange = (delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) {
      removeItem(item.id, item.selectedSize);
    } else {
      updateQuantity(item.id, item.selectedSize, newQty);
    }
  };

  return (
    <div className="flex gap-5 py-6 border-b border-stone-200 animate-fadeIn">
      {/* Image */}
      <Link href={`/products/${item.id}`} className="flex-shrink-0 w-24 h-32 bg-stone-100 relative overflow-hidden">
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-stone-200 flex items-center justify-center">
            <span className="text-stone-400 text-xs">No img</span>
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-1">{item.category}</p>
            <Link href={`/products/${item.id}`}>
              <h3 className="text-sm font-medium text-stone-900 hover:text-accent transition-colors leading-snug">
                {item.title}
              </h3>
            </Link>
            {item.selectedSize && (
              <p className="text-xs text-stone-500 mt-1">Size: {item.selectedSize}</p>
            )}
            {item.selectedColor && (
              <p className="text-xs text-stone-500">Color: {item.selectedColor}</p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.id, item.selectedSize)}
            className="text-stone-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
            aria-label="Remove item"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity */}
          <div className="flex items-center border border-stone-200">
            <button
              onClick={() => handleQtyChange(-1)}
              className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-medium text-stone-800">{item.quantity}</span>
            <button
              onClick={() => handleQtyChange(1)}
              className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Price */}
          <p className="text-sm font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
