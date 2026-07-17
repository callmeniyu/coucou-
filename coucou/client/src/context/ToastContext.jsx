import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { X } from "lucide-react";

const ToastContext = createContext(null);

const toastStyles = {
  success:
    "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  fail:
    "bg-red-500/10 border-red-500/30 text-red-300",
  info:
    "bg-blue-500/10 border-blue-500/30 text-blue-300",
};

const toastIcons = {
  success: "✓",
  fail: "✕",
  info: "ℹ",
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const value = useMemo(
    () => ({ showToast, removeToast }),
    [showToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-x-0 top-4 flex justify-center px-4 z-[100] pointer-events-none">
        <div className="flex flex-col items-center gap-2 w-full max-w-sm">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto animate-slide-in-right w-full rounded-xl px-4 py-3 shadow-lg backdrop-blur-xl border ${
                toastStyles[toast.type] ?? toastStyles.info
              } flex items-center gap-3`}
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                {toastIcons[toast.type] ?? toastIcons.info}
              </span>
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full hover:bg-white/10 text-white/40 hover:text-white/70 transition-all duration-200 cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
