"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface Toast {
  id: number;
  message: string;
  href?: string;
  hrefLabel?: string;
}

interface ToastContextValue {
  notify: (message: string, opts?: { href?: string; hrefLabel?: string }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const notify = useCallback(
    (message: string, opts?: { href?: string; hrefLabel?: string }) => {
      const id = ++counter.current;
      setToasts((prev) => [...prev, { id, message, ...opts }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3600);
    },
    [],
  );

  const value = useMemo<ToastContextValue>(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center justify-between gap-4 border border-line bg-ink px-5 py-4 text-paper shadow-xl fade-up"
          >
            <span className="text-sm">{t.message}</span>
            {t.href && (
              <a
                href={t.href}
                className="eyebrow link-underline shrink-0 !text-[0.6rem] !text-gold-soft"
              >
                {t.hrefLabel ?? "View"}
              </a>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
