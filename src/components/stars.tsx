export function Stars({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block text-[0.85em] leading-none">
            <span className="text-line">★</span>
            <span
              className="absolute inset-0 overflow-hidden text-gold"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        );
      })}
    </span>
  );
}
