import "./globals.css";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Space_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${space_mono.variable} ${space_grotest.variable} min-h-screen bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
