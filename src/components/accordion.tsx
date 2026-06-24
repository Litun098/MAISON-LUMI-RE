"use client";

import { useState, type ReactNode } from "react";

export function Accordion({
  items,
  defaultOpen,
}: {
  items: { title: string; content: ReactNode }[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(
    defaultOpen ?? null,
  );

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="eyebrow !text-[0.66rem] text-ink">
                {item.title}
              </span>
              <span className="text-lg text-stone">{isOpen ? "−" : "+"}</span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 text-sm text-ink-soft">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
