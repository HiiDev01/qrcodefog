import { useCallback, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function useToast() {
  const [toast, setToast] = useState(null);
  const timer = useRef();
  const notify = useCallback((message, type = 'success') => {
    clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = setTimeout(() => setToast(null), 3500);
  }, []);
  return [toast, notify];
}

export function ToastHost({ toast }) {
  if (!toast) return null;
  const Icon = toast.type === 'error' ? AlertCircle : CheckCircle2;
  return (
    <div className={`toast toast-${toast.type}`} role="status">
      <Icon size={18} /> {toast.message}
    </div>
  );
}
