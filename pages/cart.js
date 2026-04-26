import Head from "next/head";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

export default function CartPage() {
  const { items, totalItems, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <>
        <Head>
          <title>Order Confirmed — Maison</title>
        </Head>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md animate-fadeUp opacity-0">
            <div className="w-16 h-16 bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={28} className="text-accent" />
            </div>
            <h1 className="font-display text-4xl font-light text-stone-900 mb-3">Order Confirmed</h1>
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              Thank you for your purchase. You'll receive a confirmation email shortly with your order details and tracking information.
            </p>
            <Link href="/" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Your Bag — Maison</title>
        </Head>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md animate-fadeUp opacity-0">
            <div className="w-20 h-20 bg-stone-100 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-stone-400" />
            </div>
            <h1 className="font-display text-4xl font-light text-stone-900 mb-3">Your bag is empty</h1>
            <p className="text-stone-500 text-sm mb-8">
              Looks like you haven't added anything to your bag yet.
            </p>
            <Link href="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Your Bag ({totalItems}) — Maison</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-stone-200">
          <div>
            <p className="section-subtitle mb-1">Review your order</p>
            <h1 className="section-title">
              Your Bag
              <span className="text-stone-400 font-sans text-xl font-light ml-3">({totalItems})</span>
            </h1>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="divide-y-0">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.selectedSize}`} item={item} />
              ))}
            </div>

            {/* Promo code */}
            <div className="mt-6 flex gap-0 max-w-sm">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 border border-stone-300 bg-transparent text-sm px-4 py-2.5 focus:outline-none focus:border-stone-700 transition-colors text-stone-700 placeholder:text-stone-400"
              />
              <button className="bg-stone-900 text-cream text-xs tracking-widest uppercase px-5 hover:bg-stone-700 transition-colors">
                Apply
              </button>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors mt-8 sm:hidden"
            >
              <ArrowLeft size={13} />
              Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <CartSummary onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </>
  );
}
