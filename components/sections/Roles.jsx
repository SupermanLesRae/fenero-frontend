import { createApolloClient } from "@/lib/apolloClient";
import { ROLES_QUERY } from "@/lib/queries/Queries";
import Link from "next/link";
import { Button } from "../ui/button";
import { IconArrowRight } from "@tabler/icons-react";

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
        <div className="flex justify-center flex-wrap gap-0 overflow-hidden bg-white rounded-xl mt-10 shadow-sm py-2 border mx-6 lg:mx-0">
          {sectionData.roles
            .filter((item) => item.isactive)
            .map((item, index) => (
              <div key={"roles" + index} className="w-full">
                <div
                  key={index}
                  className="flex flex-row justify-between items-center w-full py-4 px-4"
                >
                  <div className="flex-1 text-left">
                    {" "}
                    <p>{item.title}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p>{item.place}</p>
                  </div>
                  <div className="flex-1 text-right">
                    <Link
                      className="w-full"
                      href={item?.link || "/"}
                      target={
                        item?.link?.includes(".pdf") ||
                        item?.link?.includes("http")
                          ? "_blank"
                          : "_self"
                      }
                      rel={
                        item?.link?.includes(".pdf") ||
                        item?.link?.includes("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <Button
                        size="lg"
                        className={`cursor-pointer w-full lg:w-auto max-w-auto transition shadow-sm bg-[#AFCE67] hover:bg-[#D1DF20] shadow-[#AFCE67]/30 hover:shadow-[#AFCE67]/10 ${
                          customStyles && customStyles
                        }`}
                      >
                        <span className=" font-bold text-[16px] text-black">
                          Apply Now
                        </span>

                        <IconArrowRight color="#000000" stroke={2} />
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* HR only if NOT last item */}
                {index < activeRoles.length - 1 && (
                  <hr className="border-t border-[#C5D320] my-0 mx-4" />
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
