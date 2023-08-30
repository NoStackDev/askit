import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { GlobalContextProvider } from "./context/Store";
import { SidebarContextProvider } from "./context/sidebarContext";
import { AuthContextProvider } from "./context/authContext";
import { FeedsContextProvider } from "./context/feedsContext";
import { RequestContextProvider } from "./context/requestContext";
import { ResponseContextProvider } from "./context/responseContext";
import StatusModal from "@/components/StatusModal";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const space_mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const space_grotest = Space_Grotesk({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotest",
});

export const metadata = {
  title: "AskCenta",
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
        className={`${inter.className} ${space_mono.variable} ${space_grotest.variable} bg-background`}
      >
        <GlobalContextProvider>
          <AuthContextProvider>
            <SidebarContextProvider>
              <Navbar />
              <FeedsContextProvider>
                <RequestContextProvider>
                  <ResponseContextProvider>
                    <div className="bg-background md:flex w-full md:mb-20">
                      <Sidebar className="" />
                      <div className="w-full">{children}</div>
                    </div>
                    <Footer className="" />
                    <StatusModal />
                  </ResponseContextProvider>
                </RequestContextProvider>
              </FeedsContextProvider>
            </SidebarContextProvider>
          </AuthContextProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
