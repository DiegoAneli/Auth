import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "../client-layout"; // Importa il ClientLayout

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "You4Task",
  description: "Rendi la Gestione dei Tuoi Progetti Semplice e Intuitiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout> {/* Usa il ClientLayout */}
      </body>
    </html>
  );
}
