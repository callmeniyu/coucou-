import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

const toastStyles = {
  success: "text-green-400 bg-green-600/10 border border-green-400",
  fail: "text-red-900 bg-red-600/10 border border-red-900",
  info: "text-slate-900 bg-slate-100 border border-slate-300",
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const value = useMemo(
    () => ({ showToast, removeToast }),
    [showToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-portal pointer-events-none fixed inset-x-0 top-6 flex justify-end px-6">
        <div className="space-y-3">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={` max-w-sm rounded-xl px-4 py-3 shadow-lg ${toastStyles[toast.type] ?? toastStyles.info}`}
            >
              {toast.message}
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
