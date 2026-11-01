import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageContainer } from "@/components/layout/PageContainer";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChurnGuard",
  description:
    "Customer churn prediction and retention analysis for telecom teams.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-on-surface">
        <Navbar />
        <main className="flex-1 pt-16 print:pt-0">
          <PageContainer>{children}</PageContainer>
        </main>
        <Footer />
      </body>
    </html>
  );
}
