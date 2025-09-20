import type { Metadata } from "next";
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
        <NavHeader cartCount={3} />
        <main>{children}</main>
      </body>
    </html>
  );
}
