import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 3000);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900 text-cream px-5 py-3.5 shadow-xl transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <CheckCircle size={16} className="text-accent flex-shrink-0" />
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 text-stone-400 hover:text-cream transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}
