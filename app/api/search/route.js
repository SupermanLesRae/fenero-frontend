import { NextResponse } from "next/server";
import { createApolloClient } from "@/lib/apolloClient";
import { MenuQuery } from "@/lib/queries/MenuQuery";
import { NEWS_POSTS_QUERY, RECRUITER_POSTS_QUERY } from "@/lib/queries/Queries";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();
  if (!q) return NextResponse.json([]);

  const client = createApolloClient();

  /* ------------------ MENU DATA ------------------ */
  const { data: menuData } = await client.query({ query: MenuQuery.GET_MENUS });
  const headerMenuItems =
    menuData.headers.nodes[0]?.headerCoreFields?.menuItems || [];

  const headerResults = [];

  headerMenuItems.forEach((item) => {
    const parentMatches =
      item.label?.toLowerCase().includes(q) ||
      (item.link && item.link.toLowerCase().includes(q));

    // Add parent if link exists and parentMatches
    if (item.link && parentMatches) {
      headerResults.push({
        label: item.label,
        url: item.link.startsWith("http")
          ? new URL(item.link).pathname
          : item.link,
      });
    }

    // Add children if parent matches OR child matches
    if (Array.isArray(item.subMenuItems)) {
      item.subMenuItems.forEach((sub) => {
        if (sub.label && sub.link) {
          const childMatches =
            sub.label.toLowerCase().includes(q) ||
            sub.link.toLowerCase().includes(q) ||
            parentMatches;
          if (childMatches) {
            headerResults.push({
              label: sub.label,
              url: sub.link.startsWith("http")
                ? new URL(sub.link).pathname
                : sub.link,
            });
          }
        }
      });
    }
  });

  /* ------------------ FOOTER ------------------ */
  const footerSections =
    menuData.footers.nodes[0]?.footerCoreFields?.footerSections || [];
  const footerResults = [];
  footerSections.forEach((section) => {
    section.footerSectionLinks?.forEach((link) => {
      if (link.footerSectionLinkLabel && link.footerSectionLink) {
        const matches =
          link.footerSectionLinkLabel.toLowerCase().includes(q) ||
          link.footerSectionLink.toLowerCase().includes(q);
        if (matches) {
          footerResults.push({
            label: link.footerSectionLinkLabel,
            url: link.footerSectionLink.startsWith("http")
              ? new URL(link.footerSectionLink).pathname
              : link.footerSectionLink,
          });
        }
      }
    });
  });

  /* ------------------ NEWS POSTS ------------------ */
  const { data: newsData } = await client.query({ query: NEWS_POSTS_QUERY });

  console.log("newsData:------> ", newsData.newsPosts?.nodes);
  const searchTerm = q.trim().toLowerCase();

  const newsResults =
    newsData.newsPosts?.nodes
      .filter((post) => {
        const core = post.newsPostsCoreFields;
        if (!core) return false;
        if (!searchTerm) return true;

        // title match
        if (core.title?.toLowerCase().includes(searchTerm)) {
          return true;
        }

        // tags[] contains match
        return core.tags?.some((tag) => tag.toLowerCase().includes(searchTerm));
      })
      .map((post) => ({
        label: post.newsPostsCoreFields?.title || "",
        url: `/knowledge-hub/${post.slug}`,
        tags: post.newsPostsCoreFields?.tags || [],
        desc: post.newsPostsCoreFields?.description || "",
      })) || [];

  /* ------------------ RECRUITER POSTS ------------------ */
  const { data: recruiterData } = await client.query({
    query: RECRUITER_POSTS_QUERY,
  });
  const recruiterResults =
    recruiterData.recruiterPosts?.nodes.map((post) => ({
      label: post.recruiterPostsCoreFields?.title || "",
      url: `/recruiter/${post.slug}`,
    })) || [];

  /* ------------------ COMBINE ALL ------------------ */
  const combined = [
    ...headerResults,
    ...footerResults,
    ...newsResults,
    ...recruiterResults,
  ];

  console.log("combined: ", combined);

  /* ------------------ NORMALIZE + FILTER ------------------ */
  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const normalizedQuery = normalize(q);

  console.log("normalizedQuery: ", normalizedQuery);

  const filtered = combined
    .filter((item) => {
      const label = normalize(item.label);
      const url = (item.url || "").toLowerCase();
      const tags = (item.tags || []).map(normalize);
      const desc = normalize(item.desc || "");

      return (
        label.includes(normalizedQuery) ||
        url.includes(normalizedQuery) ||
        tags.some((tag) => tag.includes(normalizedQuery)) ||
        desc.includes(normalizedQuery)
      );
    })
    .map((item) => ({
      title: item.label,
      slug: item.url,
      normTitle: normalize(item.label),
    }));

  console.log("filtered: ", filtered);

  /* ------------------ DEDUPE ------------------ */
  const dedupedMap = new Map();
  filtered.forEach((item) => {
    const existing = dedupedMap.get(item.normTitle);
    if (!existing || (existing.slug === "/" && item.slug !== "/")) {
      dedupedMap.set(item.normTitle, item);
    }
  });

  console.log("dedupedMap: ", dedupedMap);

  const results = Array.from(dedupedMap.values()).map(
    ({ normTitle, ...item }, index) => ({
      id: index.toString(),
      ...item,
    }),
  );

  console.log("results: ", results);

  return NextResponse.json(results);
}
