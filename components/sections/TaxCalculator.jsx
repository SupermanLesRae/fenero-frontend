import { createApolloClient } from "@/lib/apolloClient";
import { TAX_INFO_QUERY } from "@/lib/queries/Queries";
import { TaxCalculatorForm } from "../utilities/TaxCalculatorForm";

{
  /* More About contracting */
}
export async function TaxCalculator() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: TAX_INFO_QUERY,
  });

  const sectionData = data?.taxCalculations?.nodes[0]?.taxCalculatorFields;
  if (!sectionData) return null;

  return (
    <div className="pb-20 bg-[#ffffff] h-auto">
      {sectionData && (
        <section className="relative w-full px-6">
          <h2 className="relative text-[36px] md:text-[48px] leading-12 md:leading-14 font-extrabold font-nunito select-none text-center pt-20 pb-4 text-[#000E47]">
            {sectionData.title}
          </h2>

          <p
            className="text-gray-600 text-[14px] text-center max-w-[700px] font-semibold sm:text-[16px] mx-auto"
            dangerouslySetInnerHTML={{
              __html: sectionData.desc,
            }}
          />

          <div className="bg-[#ECF8EF] max-w-[1000px] mx-auto mt-10 p-8 md:p-12 rounded-lg shadow-lg">
            <TaxCalculatorForm />
          </div>

          <p
            className="text-gray-600 text-[14px] text-center max-w-[700px] font-semibold sm:text-xs mx-auto pt-10"
            dangerouslySetInnerHTML={{
              __html: sectionData.disclaimer,
            }}
          />
        </section>
      )}
    </div>
  );
}
