"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ml-newsletter-dismissed";

export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = window.setTimeout(() => setOpen(true), 6000);
    return () => window.clearTimeout(t);
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    window.setTimeout(dismiss, 2200);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[58] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative grid w-full max-w-3xl overflow-hidden bg-paper shadow-2xl sm:grid-cols-2">
        <div
          className="hidden min-h-[22rem] sm:block"
          style={{ background: "linear-gradient(150deg, #4a463f, #2c2a26)" }}
        />
        <div className="relative px-8 py-12">
          <button
            onClick={dismiss}
            className="eyebrow absolute right-5 top-5 !text-[0.6rem] text-stone hover:text-ink"
            aria-label="Close"
          >
            Close
          </button>
          {done ? (
            <div className="flex h-full flex-col justify-center">
              <p className="eyebrow text-gold">Merci</p>
              <h2 className="mt-3 font-serif text-3xl text-ink">
                Welcome to the house.
              </h2>
              <p className="mt-3 text-sm text-ink-soft">
                Your first dispatch is on its way.
              </p>
            </div>
          ) : (
            <>
              <p className="eyebrow text-stone">Private client list</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">
                Ten percent on your first order.
              </h2>
              <p className="mt-3 text-sm text-ink-soft">
                Join our list for early access to collections, atelier stories and
                private events. We write seldom, and only when it matters.
              </p>
              <form onSubmit={submit} className="mt-6">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full border border-line bg-paper px-3 py-3 text-sm text-ink placeholder:text-stone focus:border-ink focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-3 w-full bg-ink py-3.5 transition-colors hover:bg-ink-soft"
                >
                  <span className="eyebrow !text-[0.64rem] !text-paper">
                    Subscribe
                  </span>
                </button>
              </form>
              <button
                onClick={dismiss}
                className="eyebrow mt-4 !text-[0.58rem] text-stone hover:text-ink"
              >
                No thank you
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
