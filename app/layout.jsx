import { Nunito } from "next/font/google";
import "./globals.css";
import TopLoadingBar from "@/components/utilities/TopLoadingBar";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      style={{
        colorScheme: "light",
        backgroundColor: "#E1E1E1",
      }}
    >
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body
        style={{
          backgroundColor: "#E1E1E1",
          color: "#111111",
        }}
        className={`${nunito.variable} antialiased`}
      >
        <TopLoadingBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
