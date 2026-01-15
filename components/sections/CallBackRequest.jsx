import { createApolloClient } from "@/lib/apolloClient";
import { CALLBACK_QUERY } from "@/lib/queries/Queries";
import CallbackForm from "../utilities/CallbackForm";
import Image from "next/image";

// Server Component
export default async function CallBackRequest() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: CALLBACK_QUERY,
  });

  const sectionData = data.callbackrequests.nodes[0].callbackRequestCoreFields;

  if (!sectionData) return null;

  return (
    <div className="relative pb-20 px-10 min-h-50">
      <h2 className="relative text-[30px] md:text-[48px] font-bold font-nunito mb-2 select-none text-white text-center pt-20 pb-0 z-11">
        {sectionData?.title}
      </h2>
      <p
        dangerouslySetInnerHTML={{
          __html: sectionData?.description,
        }}
        className="relative text-[20px] md:text-[20px] font-nunito mb-2 select-none text-white text-center  z-11"
      ></p>
      <div className="absolute w-full h-full z-0 left-0 top-0">
        <Image
          unoptimized
          src={sectionData?.img.node.sourceUrl}
          alt={sectionData?.img.node.altText || "Image"}
          className="w-full h-full object-cover"
          width={1411}
          height={408}
        />
        <div className="absolute top-0 left-0 bg-[#036735] w-full h-full inset-0 mix-blend-multiply" />
      </div>

      {/* Client-side form component */}
      <div className="relative max-w-358.75 mx-auto py-10 px-10 shadow-sm">
        <CallbackForm />
      </div>
    </div>
  );
}
