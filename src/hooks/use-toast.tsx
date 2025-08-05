'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface ToastContextType {
  toasts: Toast[];
  toast: (props: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((props: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...props, id };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismiss(id);
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-md shadow-lg transition-all ${
              toast.variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground'
                : 'bg-background text-foreground border'
            }`}
          >
            {toast.title && (
              <h4 className="font-semibold">{toast.title}</h4>
            )}
            {toast.description && (
              <p className="text-sm opacity-90">{toast.description}</p>
            )}
            <button
              onClick={() => dismiss(toast.id)}
              className="absolute top-2 right-2 text-xs opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export const toast = (props: Omit<Toast, 'id'>) => {
  // This is a simplified version - in a real app you'd want to use the context
  console.log('Toast:', props);
};
