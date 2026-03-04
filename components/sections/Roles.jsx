import { createApolloClient } from "@/lib/apolloClient";
import { ROLES_QUERY } from "@/lib/queries/Queries";
import Link from "next/link";
import { Button } from "../ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import IrishJobsWidget from "../utilities/IrishJobsWidget";

export async function Roles({ customStyles }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: ROLES_QUERY,
  });

  const sectionData = data.openRoles.nodes[0].openRolesCoreFields;
  const activeRoles = sectionData.roles.filter((item) => item.isactive);

  if (!sectionData) return null;

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: sectionData.styling.backgroundColor }}
    >
      <div className="relative w-full mx-auto max-w-213.25 pb-10 lg:pb-40">
        <h2 className="relative text-[30px] md:text-[48px] font-extrabold font-nunito mb-2 select-none text-[#000E47] text-center pt-10 lg:pt-28 pb-4 lg:pb-14">
          {sectionData.title}
        </h2>
        <p
          dangerouslySetInnerHTML={{ __html: sectionData.description }}
          className="font-nunito font-medium text-[16px] leading-6 tracking-[0.15px] text-[#34353C] select-none px-8"
        ></p>

        <div className="flex justify-center flex-wrap gap-0 overflow-hidden bg-white rounded-xl mt-10 shadow-sm py-0 border mx-0 lg:mx-6 px-10 lg:mx-0">
          <IrishJobsWidget />
        </div>
      </div>
    </section>
  );
}
