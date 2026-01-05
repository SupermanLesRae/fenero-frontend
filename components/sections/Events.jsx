import { createApolloClient } from "@/lib/apolloClient";
import { EVENTS_QUERY } from "@/lib/queries/Queries";
import ResponsiveGridGallery from "../utilities/ResponsiveGridGallery";

export async function Events() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: EVENTS_QUERY,
  });

  const sectionData = data.events.nodes[0].eventsCoreFields;

  const images = sectionData.gallery.nodes;
  const imagesSquare = sectionData.gallerySquare.nodes;

  if (!sectionData) return null;
  return (
    <section
      className="text-white pb-30"
      style={{ backgroundColor: sectionData.styling.backgroundColor }}
    >
      <div className="flex w-full">
        <div className="relative flex flex-row xl:items-center select-none mx-auto pb-20">
          <div className="w-full text-center">
            <h2 className="mb-0 text-[40px] leading-12 md:text-[48px] md:leading-13 tracking-[0.15px] font-bold pt-20 pb-0">
              {sectionData.title}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full px-10">
        <ResponsiveGridGallery images={images} />
      </div>
      <div className="w-full pt-5 px-10">
        <ResponsiveGridGallery images={imagesSquare} square={true} />
      </div>
    </section>
  );
}
