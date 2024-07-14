import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientWrapper from "@/components/shared/QueryClientWrapper";
import FirebaseConfig from "@/app/services/FirebaseConfig";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopify Academy",
  description: "Aprenda a criar sua loja virtual com a Shopify Academy, o melhor curso de Shopify em português.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await FirebaseConfig.initialize();

  return (
    <html className={"scroll-smooth"} lang="en">
      <body className={font.className}>
        <QueryClientWrapper>{children}</QueryClientWrapper>
      </body>
    </html>
  );
}
