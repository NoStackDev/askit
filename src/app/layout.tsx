import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar1";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const space_mono = Space_Mono({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const space_grotest = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotest",
});

export const metadata = {
  title: "AskIt",
  description: "Post or purchase products and services anonymously",
  StyleSheet:
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${space_mono.variable} ${space_grotest.variable} min-h-screen`}
      >
        <Navbar />
        <div className="bg-background md:px-[100px] md:flex">
          <Sidebar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
