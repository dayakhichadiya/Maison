export default function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-stone-900 text-cream",
    accent: "bg-accent text-white",
    sale: "bg-red-600 text-white",
    outline: "border border-stone-300 text-stone-700",
  };

  return (
    <span className={`inline-block text-[10px] tracking-widest uppercase font-medium px-2 py-0.5 ${variants[variant]}`}>
      {children}
    </span>
  );
}
