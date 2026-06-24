"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { products, formatPrice } from "@/lib/products";
import { ProductSwatch } from "@/components/product-swatch";

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNo, setOrderNo] = useState("");
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOrderNo(`ML-${Math.floor(100000 + Math.random() * 899999)}`);
    setPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="eyebrow text-gold">Merci</p>
        <h1 className="mt-4 font-serif text-5xl text-ink">
          Your order is confirmed
        </h1>
        <p className="mt-5 text-ink-soft">
          A confirmation has been sent to your inbox. Each piece is now being
          prepared and wrapped by hand in our atelier.
        </p>
        <p className="mt-2 text-sm text-stone">Order no. {orderNo}</p>
        <Link
          href="/shop"
          className="mt-10 inline-block bg-ink px-9 py-4 transition-colors hover:bg-ink-soft"
        >
          <span className="eyebrow !text-[0.68rem] !text-paper">
            Continue shopping
          </span>
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl text-ink">Your bag is empty</h1>
        <p className="mt-4 text-stone">
          Add a piece to the bag before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="eyebrow link-underline mt-8 inline-block text-ink"
        >
          Discover the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-serif text-4xl text-ink">Checkout</h1>

      <div className="mt-10 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <Fieldset legend="Contact">
            <Field label="Email" type="email" name="email" full />
          </Fieldset>

          <Fieldset legend="Shipping address">
            <Field label="First name" name="first" />
            <Field label="Last name" name="last" />
            <Field label="Address" name="address" full />
            <Field label="City" name="city" />
            <Field label="Postal code" name="zip" />
            <Field label="Country" name="country" full />
          </Fieldset>

          <Fieldset legend="Payment">
            <Field label="Card number" name="card" placeholder="•••• •••• •••• ••••" full />
            <Field label="Expiry" name="exp" placeholder="MM / YY" />
            <Field label="CVC" name="cvc" placeholder="•••" />
            <p className="col-span-2 text-xs text-stone">
              This is a demonstration storefront — no payment will be processed
              and no card details are stored.
            </p>
          </Fieldset>

          <button
            type="submit"
            className="w-full bg-ink py-4 transition-colors hover:bg-ink-soft"
          >
            <span className="eyebrow !text-[0.68rem] !text-paper">
              Place order · {formatPrice(total)}
            </span>
          </button>
        </form>

        {/* summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-line bg-paper-2 p-7">
            <h2 className="font-serif text-2xl text-ink">Order summary</h2>
            <ul className="mt-6 divide-y divide-line">
              {lines.map((line) => {
                const product = products.find((p) => p.id === line.productId);
                if (!product) return null;
                const color =
                  product.colors.find((c) => c.name === line.color) ??
                  product.colors[0];
                return (
                  <li
                    key={`${line.productId}-${line.size}-${line.color}`}
                    className="flex gap-4 py-4"
                  >
                    <ProductSwatch
                      product={product}
                      monogram={false}
                      swatch={color.swatch}
                      accent={color.accent}
                      label=""
                      className="h-20 w-14 shrink-0"
                    />
                    <div className="flex flex-1 justify-between">
                      <div>
                        <p className="font-serif text-base text-ink">
                          {product.name}
                        </p>
                        <p className="text-xs text-stone">
                          {line.color} · {line.size} · ×{line.quantity}
                        </p>
                      </div>
                      <p className="text-sm tabular-nums text-ink-soft">
                        {formatPrice(product.price * line.quantity)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-6 space-y-2 border-t border-line pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-stone">Subtotal</dt>
                <dd className="tabular-nums text-ink-soft">
                  {formatPrice(subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-stone">Shipping</dt>
                <dd className="text-ink-soft">Complimentary</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <dt className="font-serif text-lg text-ink">Total</dt>
                <dd className="font-serif text-lg tabular-nums text-ink">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="eyebrow text-ink">{legend}</legend>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  name,
  type = "text",
  full = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  full?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={`block ${full ? "col-span-2" : ""}`}>
      <span className="eyebrow !text-[0.58rem] text-stone">{label}</span>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="mt-1.5 w-full border border-line bg-paper px-3 py-3 text-sm text-ink placeholder:text-stone focus:border-ink focus:outline-none"
      />
    </label>
  );
}
