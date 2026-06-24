"use client";

import { useState } from "react";
import type { Category } from "@/lib/types";

const tables: Record<string, { head: string[]; rows: string[][] }> = {
  letter: {
    head: ["Size", "Chest (cm)", "Waist (cm)"],
    rows: [
      ["XS", "86–90", "70–74"],
      ["S", "90–96", "74–80"],
      ["M", "96–102", "80–86"],
      ["L", "102–108", "86–92"],
      ["XL", "108–114", "92–98"],
    ],
  },
  jacket: {
    head: ["Size", "Chest (cm)", "EU"],
    rows: [
      ["44", "86", "44"],
      ["46", "91", "46"],
      ["48", "96", "48"],
      ["50", "101", "50"],
      ["52", "106", "52"],
      ["54", "111", "54"],
    ],
  },
  dress: {
    head: ["Size", "Bust (cm)", "Hip (cm)"],
    rows: [
      ["34", "80", "86"],
      ["36", "84", "90"],
      ["38", "88", "94"],
      ["40", "92", "98"],
      ["42", "96", "102"],
    ],
  },
};

function tableFor(category: Category): { head: string[]; rows: string[][] } {
  if (category === "Knitwear" || category === "Shirts") return tables.letter;
  if (category === "Dresses") return tables.dress;
  return tables.jacket;
}

export function SizeGuide({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);
  const table = tableFor(category);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="eyebrow link-underline !text-[0.6rem] text-stone hover:text-ink"
      >
        Size guide
      </button>

      {open && (
        <div className="fixed inset-0 z-[57] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-paper p-8 shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="eyebrow absolute right-5 top-5 !text-[0.6rem] text-stone hover:text-ink"
            >
              Close
            </button>
            <p className="eyebrow text-stone">{category}</p>
            <h3 className="mt-2 font-serif text-2xl text-ink">Size guide</h3>
            <table className="mt-6 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink">
                  {table.head.map((h) => (
                    <th
                      key={h}
                      className="eyebrow py-2 text-left !text-[0.58rem] text-ink"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-line">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className="py-2.5 tabular-nums text-ink-soft first:font-medium first:text-ink"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-xs text-stone">
              Measurements are a guide. For a precise fit, our atelier offers
              complimentary made-to-measure consultations in every boutique.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
