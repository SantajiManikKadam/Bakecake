import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-[#FFFDF9] border-[#7E9B5E] text-[#30231F]'
              : toast.type === 'error'
              ? 'bg-[#FFFDF9] border-[#6F1D3A] text-[#30231F]'
              : 'bg-[#FFFDF9] border-[#E6D8C7] text-[#30231F]'
          }`}
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#5E7844] shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-[#6F1D3A] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#C9862B] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-sm font-medium leading-snug">
            {toast.message}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#75675F] hover:text-[#30231F] p-0.5 transition-colors"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
