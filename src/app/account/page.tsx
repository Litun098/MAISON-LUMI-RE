"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/toast-context";
import { useWishlist } from "@/components/wishlist-context";

export default function AccountPage() {
  const { notify } = useToast();
  const { count: wishCount } = useWishlist();
  const [signedIn, setSignedIn] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSignedIn(true);
    notify("Welcome back to Maison Lumière");
  }

  if (signedIn) {
    return <Dashboard name={name || "Madame"} wishCount={wishCount} onSignOut={() => setSignedIn(false)} />;
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <header className="text-center">
        <p className="eyebrow">{mode === "login" ? "Welcome back" : "Join the house"}</p>
        <h1 className="mt-3 font-serif text-4xl text-ink">
          {mode === "login" ? "Sign in" : "Create account"}
        </h1>
      </header>

      <div className="mt-8 flex border-b border-line">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 border-b-2 pb-3 transition-colors ${
              mode === m ? "border-ink" : "border-transparent"
            }`}
          >
            <span className="eyebrow !text-[0.62rem] text-ink">
              {m === "login" ? "Sign in" : "Register"}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-8 space-y-4">
        {mode === "register" && (
          <Input label="Full name" value={name} onChange={setName} />
        )}
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        {mode === "login" && (
          <div className="text-right">
            <button type="button" className="eyebrow !text-[0.58rem] text-stone hover:text-ink">
              Forgot password?
            </button>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-ink py-4 transition-colors hover:bg-ink-soft"
        >
          <span className="eyebrow !text-[0.66rem] !text-paper">
            {mode === "login" ? "Sign in" : "Create account"}
          </span>
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-stone">
        This is a demonstration account — no credentials are stored.
      </p>
    </div>
  );
}

function Dashboard({
  name,
  wishCount,
  onSignOut,
}: {
  name: string;
  wishCount: number;
  onSignOut: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-end justify-between border-b border-line pb-6">
        <div>
          <p className="eyebrow text-stone">Your account</p>
          <h1 className="mt-2 font-serif text-4xl text-ink">Bonjour, {name}</h1>
        </div>
        <button onClick={onSignOut} className="eyebrow !text-[0.6rem] text-stone hover:text-ink">
          Sign out
        </button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Card title="Recent order">
          <p className="text-sm text-ink-soft">Order ML-481920</p>
          <p className="mt-1 text-xs text-stone">Le Manteau · Espresso · 48</p>
          <p className="mt-3 eyebrow !text-[0.58rem] text-gold">In production</p>
        </Card>
        <Card title="Wishlist">
          <p className="font-serif text-3xl text-ink">{wishCount}</p>
          <p className="mt-1 text-xs text-stone">saved pieces</p>
          <Link href="/wishlist" className="eyebrow link-underline mt-3 inline-block !text-[0.58rem] text-ink">
            View wishlist
          </Link>
        </Card>
        <Card title="Membership">
          <p className="font-serif text-xl text-ink">Cercle Privé</p>
          <p className="mt-1 text-xs text-stone">Since 2024 · Early access</p>
        </Card>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card title="Saved addresses">
          <p className="text-sm text-ink-soft">318 Rue Saint-Honoré</p>
          <p className="text-sm text-ink-soft">75001 Paris, France</p>
          <button className="eyebrow link-underline mt-4 !text-[0.58rem] text-ink">
            Manage addresses
          </button>
        </Card>
        <Card title="Made-to-measure profile">
          <p className="text-sm text-ink-soft">
            Your measurements are on file for a faster atelier experience.
          </p>
          <Link href="/boutiques" className="eyebrow link-underline mt-4 inline-block !text-[0.58rem] text-ink">
            Book a fitting
          </Link>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-line bg-paper-2 p-6">
      <p className="eyebrow text-stone">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="eyebrow !text-[0.58rem] text-stone">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="mt-1.5 w-full border border-line bg-paper px-3 py-3 text-sm text-ink focus:border-ink focus:outline-none"
      />
    </label>
  );
}
