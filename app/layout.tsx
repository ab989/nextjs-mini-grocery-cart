import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext"
import NavHeader from "./components/NavHeader";

import "./globals.css";

export const metadata: Metadata = {
  title: "Grocery App",
  description: "Suppermarket supported by White-Label Loyalty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <NavHeader />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
