import { IconExclamationCircle } from "@tabler/icons-react";
import RecruiterCard from "./RecruiterCard";
import Link from "next/link";

export default function RecruiterPostsClient({ posts }) {
  return (
    <div className="relative pb-10 px-10 min-h-50 bg-[#ffffff]">
      <h2 className="relative text-[30px] md:text-[48px] font-extrabold font-nunito select-none text-[#000E47] text-center pt-10 lg:pt-14">
        Useful resources for recruiters
      </h2>

      <p className="font-nunito font-medium text-center text-[15px] leading-6 tracking-[0.15px] select-none py-4 lg:pb-14">
        Explore the resources and the tools designed to simplify and strengthen
        your contractor relationships.
      </p>

      {/* News Cards */}
      <div className="flex flex-wrap items-top justify-center gap-6">
        {posts.length > 0 ? (
          posts.map((post, index) => {
            const item = post.recruiterPostsCoreFields;
            return (
              <RecruiterCard
                key={"recruiterpost" + index}
                image={item.img?.node.sourceUrl}
                title={item.title}
                description={item.description}
                date={item.date}
                tags={item.tags}
                downloadURL={item?.cta?.link || null}
                gotoPage={"/recruiter-resources/" + post?.slug}
              />
            );
          })
        ) : (
          <div className="w-full max-w-md flex justify-center text-center py-4 text-[#000E47] text-lg">
            <IconExclamationCircle className="w-14 h-6" /> No posts found
          </div>
        )}
      </div>
    </div>
  );
}
