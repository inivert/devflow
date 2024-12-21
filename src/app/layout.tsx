import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ClientOnly } from "@/components/ClientOnly";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevFlow",
  description: "Modern development workflow powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="relative flex min-h-screen flex-col bg-background">
            <ClientOnly>
              <Header />
            </ClientOnly>
            <main className="flex-1">{children}</main>
            <ClientOnly>
              <Footer />
            </ClientOnly>
          </div>
        </Providers>
      </body>
    </html>
  );
}
