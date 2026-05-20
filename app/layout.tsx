import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM Dashboard Demo",
  description:
    "A professional B2B CRM dashboard demo built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
