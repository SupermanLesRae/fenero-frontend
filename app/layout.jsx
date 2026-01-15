import { Nunito } from "next/font/google";
import "./globals.css";
import TopLoadingBar from "@/components/utilities/TopLoadingBar";
import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased bg-[#E1E1E1]`}>
        <TopLoadingBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
