"use client";

import { useWishlist } from "./wishlist-context";
import { useToast } from "./toast-context";

export function WishlistButton({
  productId,
  productName,
  variant = "icon",
  className = "",
}: {
  productId: string;
  productName: string;
  variant?: "icon" | "full";
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const { notify } = useToast();
  const active = has(productId);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(productId);
    notify(
      added
        ? `${productName} saved to your wishlist`
        : `${productName} removed from wishlist`,
      added ? { href: "/wishlist", hrefLabel: "View" } : undefined,
    );
  }

  if (variant === "full") {
    return (
      <button
        onClick={onClick}
        className={`flex w-full items-center justify-center gap-2 border border-line py-4 transition-colors hover:border-ink ${className}`}
        aria-pressed={active}
      >
        <Heart filled={active} />
        <span className="eyebrow !text-[0.66rem] text-ink">
          {active ? "Saved" : "Add to wishlist"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-paper/85 text-ink backdrop-blur-sm transition-transform hover:scale-110 ${className}`}
    >
      <Heart filled={active} />
    </button>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      className={filled ? "text-gold" : "text-ink"}
      aria-hidden
    >
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.2 5c2 0 3.3 1.1 4.8 3 1.5-1.9 2.8-3 4.8-3 3.2 0 4.8 3.4 3.2 6.7C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}
