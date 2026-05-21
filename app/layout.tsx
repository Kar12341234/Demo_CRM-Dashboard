import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { CrmProvider } from "@/components/crm-provider";
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
      <body suppressHydrationWarning>
        <CrmProvider>
          <AppShell>{children}</AppShell>
        </CrmProvider>
      </body>
    </html>
  );
}
