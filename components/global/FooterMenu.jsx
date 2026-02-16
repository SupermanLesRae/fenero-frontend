import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function FooterMenu({ menu }) {
  if (!menu) return null;

  return (
    <footer className="bg-[#000E47] text-white py-10 lg:py-16 lg:px-6 select-none">
      <div className="max-w-500 px-6 mx-auto grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="space-y-4 flex flex-col items-center sm:items-start max-w-xl mx-auto">
          <div className="flex items-center gap-3 mx-auto lg:mx-0">
            <Link href="/" className="cursor-pointer">
              <Image
                src={menu.logo.node.sourceUrl}
                alt={"No alternative text provided"}
                width={165}
                height={127}
              />
            </Link>
          </div>

          <p className="font-nunito font-medium text-[16px] py-6 text-white p-0 sm:pr-10 text-center lg:text-left">
            {menu.footerDescription}
          </p>

          <div className="flex items-center gap-10 pt-2 mx-auto lg:mx-0">
            <SocialLinks menu={menu} />
          </div>
        </div>

        <div className="sm:col-span-1 lg:col-span-3 mt-2">
          <h3
            dangerouslySetInnerHTML={{ __html: menu.footerSlogan }}
            className="text-center lg:text-left font-nunito text-[#38BB3F] font-medium text-[24px] sm:text-[34px] leading-10 mb-10"
          ></h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            {menu.footerSections.map((item, index) => (
              <div key={index}>
                <h3 className="mb-6 font-nunito font-semibold text-center sm:text-left text-[22px] text-white">
                  {item.footerSectionLabel}
                </h3>

                <ul className="space-y-4 font-nunito font-medium text-[16px] text-white text-center sm:text-left">
                  {item.footerSectionLinks.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.footerSectionLink || ""}
                        target={
                          item.footerSectionLink?.includes(".pdf") ||
                          item.footerSectionLink?.includes("http")
                            ? "_blank"
                            : "_self"
                        }
                        rel={
                          item.footerSectionLink?.includes(".pdf") ||
                          item.footerSectionLink?.includes("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="hover:text-[#D1DF20] transition flex items-start justify-center sm:justify-start sm:items-center gap-2"
                      >
                        {item.footerLabelIcon === "phone" && (
                          <div className="w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-phone"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            </svg>
                          </div>
                        )}

                        {item.footerLabelIcon === "email" && (
                          <div className="w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-mail"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                              <path d="M3 7l9 6l9 -6" />
                            </svg>
                          </div>
                        )}

                        {item.footerLabelIcon === "location" && (
                          <div className="w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                            </svg>
                          </div>
                        )}

                        {item.footerSectionLinkLabel}
                      </Link>
                      {item?.imagearray && (
                        <div className="w-full flex items-center justify-center lg:justify-start gap-4 mt-4">
                          {item.imagearray.map((imgObj, index) => (
                            <Image
                              key={index}
                              width={68}
                              height={69}
                              alt={imgObj.image?.node?.altText || ""}
                              className="mx-0"
                              src={imgObj.image?.node?.sourceUrl}
                            />
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t max-w-7xl mx-auto border-white mt-20 pt-10 text-center font-nunito font-medium text-[16px] text-white">
        {menu.copyrightText}
      </div>
    </footer>
  );
}
