// app/(site)/layout.jsx
import SiteChrome from "@/components/layout/SiteChrome";

export const metadata = {
  colorScheme: "light",
};

export default function SiteLayout({ children }) {
  return <SiteChrome>{children}</SiteChrome>;
}
