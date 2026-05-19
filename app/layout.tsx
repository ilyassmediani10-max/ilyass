import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renovation Manager",
  description: "Manage renovation clients, orders, materials, and costs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-950">
        <Header />
        {children}
      </body>
    </html>
  );
}
