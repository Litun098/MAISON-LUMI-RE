import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-gold">Error 404</p>
      <h1 className="mt-4 font-serif text-5xl text-ink sm:text-6xl">
        Lost in the atelier
      </h1>
      <p className="mt-5 text-ink-soft">
        The page you are looking for has been moved or no longer exists.
      </p>
      <Link
        href="/"
        className="eyebrow link-underline mt-8 inline-block text-ink"
      >
        Return home
      </Link>
    </div>
  );
}
