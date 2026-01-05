import { createApolloClient } from "@/lib/apolloClient";
import { RECRUITER_POSTS_QUERY } from "@/lib/queries/Queries";

import RecruiterPostsClient from "../utilities/RecruiterPostsClient";

export default async function RecruiterPosts() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: RECRUITER_POSTS_QUERY,
  });

  const sectionData = data?.recruiterPosts.nodes;

  if (!sectionData) return null;

  return <RecruiterPostsClient posts={sectionData} />;
}
