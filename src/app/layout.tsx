import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components";

const heebo = Heebo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FE Assessment",
  description: "Take home assessment for Frontend Engineer role",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={heebo.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
