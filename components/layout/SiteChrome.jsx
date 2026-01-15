// components/layout/SiteChrome.jsx
import { createApolloClient } from "@/lib/apolloClient";
import { MenuQuery } from "@/lib/queries/MenuQuery";
import HeaderMenu from "@/components/global/HeaderMenu";
import FooterMenu from "@/components/global/FooterMenu";

export default async function SiteChrome({ children }) {
  const client = createApolloClient();

  const { data } = await client.query({
    query: MenuQuery.GET_MENUS,
  });

  const footerMenu = data.footers.nodes[0].footerCoreFields;
  const headerMenu = data.headers.nodes[0].headerCoreFields;

  return (
    <>
      <HeaderMenu menu={headerMenu} />
      <main className="bg-white mx-auto">{children}</main>
      <FooterMenu menu={footerMenu} />
    </>
  );
}
