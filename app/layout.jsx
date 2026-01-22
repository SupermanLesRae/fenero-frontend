import { Nunito } from "next/font/google";
import "./globals.css";
import TopLoadingBar from "@/components/utilities/TopLoadingBar";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <Head>
        <meta name="color-scheme" content="light" />
      </Head>
      <body className={`${nunito.variable} antialiased bg-[#E1E1E1]`}>
        <TopLoadingBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
