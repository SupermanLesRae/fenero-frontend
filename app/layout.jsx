import { Nunito } from "next/font/google";

import "./globals.css";
import { createApolloClient } from "@/lib/apolloClient";
import { MenuQuery } from "@/lib/queries/MenuQuery";
import HeaderMenu from "@/components/global/HeaderMenu";
import FooterMenu from "@/components/global/FooterMenu";
import { Toaster } from "@/components/ui/sonner";

import TopLoadingBar from "@/components/utilities/TopLoadingBar";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "Fenero - Tax and Financial Experts",
  description:
    "Discover Fenero's award-winning tax and financial expertise for contractors and self-employed professionals. We make contracting easy.",
  keywords: [
    "tax",
    "finance",
    "contractors",
    "self-employed",
    "Fenero",
    "accounting",
  ],
  canonical: "https://fenero.ie",
  icons: {
    icon: "http://fenerodemo.local/wp-content/uploads/2025/12/favicon-32x32-1.png", // path to your favicon
    shortcut:
      "http://fenerodemo.local/wp-content/uploads/2025/12/favicon-32x32-1.png", // optional, same as icon
    apple:
      "http://fenerodemo.local/wp-content/uploads/2025/12/apple-touch-icon.png", // optional for iOS devices
  },
  openGraph: {
    title: "Fenero - Tax and Financial Experts",
    description:
      "Discover Fenero's award-winning tax and financial expertise for contractors and self-employed professionals. We make contracting easy.",
    url: "https://fenero.ie",
    siteName: "Fenero",
    images: [
      {
        url: "http://fenerodemo.local/wp-content/uploads/2025/12/logo_top.png",
        width: 1200,
        height: 630,
        alt: "Fenero - Tax and Financial Experts",
      },
    ],
    type: "website",
    locale: "en_IE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fenero - Tax and Financial Experts",
    description:
      "Discover Fenero's award-winning tax and financial expertise for contractors and self-employed professionals. We make contracting easy.",
    images: ["http://fenerodemo.local/wp-content/uploads/2025/12/logo_top.png"],
    site: "@fenero",
    creator: "@fenero",
  },
};

export default async function RootLayout({ children }) {
  const client = createApolloClient();

  const { data } = await client.query({
    query: MenuQuery.GET_MENUS,
  });

  const footerMenu = data.footers.nodes[0].footerCoreFields;
  const headerMenu = data.headers.nodes[0].headerCoreFields;

  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased bg-[#E1E1E1]`}>
        <TopLoadingBar />
        <HeaderMenu menu={headerMenu} />
        <main className=" bg-white mx-auto">{children}</main>
        <FooterMenu menu={footerMenu} />
        <Toaster />
      </body>
    </html>
  );
}
