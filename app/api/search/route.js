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
  const newsResults =
    newsData.newsPosts?.nodes.map((post) => ({
      label: post.newsPostsCoreFields?.title || "",
      url: `/knowledge-hub/${post.slug}`,
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

  const filtered = combined
    .filter(
      (item) =>
        normalize(item.label).includes(normalizedQuery) ||
        item.url.toLowerCase().includes(normalizedQuery)
    )
    .map((item) => ({
      title: item.label,
      slug: item.url,
      normTitle: normalize(item.label),
    }));

  /* ------------------ DEDUPE ------------------ */
  const dedupedMap = new Map();
  filtered.forEach((item) => {
    const existing = dedupedMap.get(item.normTitle);
    if (!existing || (existing.slug === "/" && item.slug !== "/")) {
      dedupedMap.set(item.normTitle, item);
    }
  });

  const results = Array.from(dedupedMap.values()).map(
    ({ normTitle, ...item }, index) => ({
      id: index.toString(),
      ...item,
    })
  );

  return NextResponse.json(results);
}
