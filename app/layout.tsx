import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { Navbar } from "@/components/Navbar";
import { Toast } from "@/components/Toast";

export const metadata: Metadata = {
  title: "ShopNest - Your Online Shopping Destination",
  description: "Discover amazing products at great prices. Shop electronics, fashion, home & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Navbar />
              <main>{children}</main>
              <Toast />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}