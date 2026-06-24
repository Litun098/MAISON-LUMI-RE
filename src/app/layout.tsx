import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/toast-context";
import { WishlistProvider } from "@/components/wishlist-context";
import { CartProvider } from "@/components/cart-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { NewsletterModal } from "@/components/newsletter-modal";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maison-lumiere.example"),
  title: {
    default: "Maison Lumière — Considered Luxury Since 1924",
    template: "%s · Maison Lumière",
  },
  description:
    "An independent Parisian house dressing the considered wardrobe. Outerwear, tailoring and knitwear cut, sewn and finished by hand.",
  openGraph: {
    title: "Maison Lumière",
    description: "Considered luxury, hand-finished in Florence and Paris since 1924.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <NewsletterModal />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
