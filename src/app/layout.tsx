import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../store/ReduxProvider";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
    <html lang="en"  className="dark">
      
      <body className={inter.className}><Navbar/>
      {children}
      <Toaster />
      </body>
    </html></ReduxProvider>
  );
}
