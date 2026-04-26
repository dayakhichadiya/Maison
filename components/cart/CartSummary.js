import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartSummary({ onCheckout }) {
  const { totalPrice } = useCart();

  const shipping = totalPrice > 150 ? 0 : 12;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="bg-stone-50 border border-stone-200 p-6 sticky top-28">
      <h2 className="text-xs tracking-widest uppercase text-stone-500 mb-6">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-stone-600">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      {totalPrice <= 150 && (
        <p className="text-[11px] text-stone-400 mt-3 bg-amber-50 border border-amber-100 px-3 py-2">
          Add <span className="font-medium text-stone-700">${(150 - totalPrice).toFixed(2)}</span> more for free shipping.
        </p>
      )}

      <div className="border-t border-stone-200 mt-5 pt-5 flex justify-between items-baseline">
        <span className="text-sm font-medium text-stone-900">Total</span>
        <span className="font-display text-2xl font-light text-stone-900">${grandTotal.toFixed(2)}</span>
      </div>

      <button
        onClick={onCheckout}
        className="btn-primary w-full mt-6"
      >
        Proceed to Checkout
      </button>

      <div className="mt-6 space-y-3">
        {[
          { Icon: Truck, text: "Free shipping on orders over $150" },
          { Icon: RefreshCcw, text: "30-day free returns" },
          { Icon: ShieldCheck, text: "Secure checkout" },
        ].map(({ Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5 text-[11px] text-stone-500">
            <Icon size={14} className="text-stone-400 flex-shrink-0" />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
