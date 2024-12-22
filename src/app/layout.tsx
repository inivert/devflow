import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ClientOnly } from "@/components/ClientOnly";
import { MobileDock } from "@/components/ui/MobileDock";

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
      <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        <Providers>
          <ClientOnly>
            <Header />
          </ClientOnly>
          <div className="flex-1 md:pb-0 pb-24">
            {children}
          </div>
          <ClientOnly>
            <MobileDock />
          </ClientOnly>
          <ClientOnly>
            <Footer className="hidden md:block" />
          </ClientOnly>
        </Providers>
      </body>
    </html>
  );
}
