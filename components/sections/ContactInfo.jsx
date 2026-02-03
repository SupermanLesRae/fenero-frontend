import { createApolloClient } from "@/lib/apolloClient";
import { CONTACT_INFO_QUERY } from "@/lib/queries/Queries";
import ContactInfoClient from "@/components/sections/ContactInfoClient";

export default async function ContactInfo({ section, bgColor }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: CONTACT_INFO_QUERY,
  });

  const searchText = section.toLowerCase();

  const matchedNode = data.contactInfoBlocks.nodes.find((node) => {
    return node.contactInfoBlockCoreFields.section?.some(
      (s) => s.toLowerCase() === searchText,
    );
  });

  const sectionData = matchedNode
    ? matchedNode.contactInfoBlockCoreFields
    : null;

  if (!sectionData) return null;

  return (
    <ContactInfoClient
      sectionData={sectionData}
      bgColor={bgColor || "#ECF8EF"}
    />
  );
}
