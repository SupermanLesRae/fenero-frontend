import { createApolloClient } from "@/lib/apolloClient";
import { FAQ_QUERY } from "@/lib/queries/Queries";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

{
  /* FAQ */
}
export async function FAQs({ section }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: FAQ_QUERY,
  });

  // Find the first matching node
  const searchText = section.toLowerCase(); // normalize sel

  // Find the first node whose section includes sel
  const matchedNode = data.faqs.nodes.find((node) => {
    const sections = node.faqFields.section; // e.g. ['Home', 'New to Contracting']
    return sections?.some((section) => section.toLowerCase() === searchText);
  });

  // Return solutionComparisonsCoreFields if found
  const result = matchedNode ? matchedNode.faqFields : null;

  const sectionData = result;

  if (!sectionData) return null;

  return (
    <section className="relative w-full pb-10 lg:pb-20 px-6">
      <div className="max-w-350 mx-auto text-center">
        <h2 className="relative text-[36px] leading-12 md:text-[48px] md:leading-14  font-extrabold font-nunito  select-none text-center pt-10 lg:pt-20 pb-10 text-[#000E47]">
          {sectionData.title}
        </h2>

        <Accordion
          type="single"
          collapsible
          className="w-full text-left"
          defaultValue="item-0"
        >
          {sectionData.faq.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger
                className="
          text-left
          transition-colors
          data-[state=open]:text-[#056735] font-bold cursor-pointer text-[18px]
        "
              >
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 text-balance">
                <div
                  className="prose max-w-none prose-p:mb-3"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
