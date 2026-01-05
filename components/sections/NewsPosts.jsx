import { createApolloClient } from "@/lib/apolloClient";
import { NEWS_POSTS_QUERY } from "@/lib/queries/Queries";
import NewsPostsClient from "@/components/utilities/NewsPostsClient";

export default async function NewsPosts() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: NEWS_POSTS_QUERY,
  });

  const sectionData = data.newsPosts.nodes;
  const tags = data?.newsPostTags.nodes[0].newsPostTagFields.newsTags;
  if (!sectionData) return null;

  return <NewsPostsClient posts={sectionData} tags={tags} />;
}
