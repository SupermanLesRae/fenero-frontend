import { IconLink } from "@tabler/icons-react";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
  // unwrap searchParams if it's a promise
  const params = await searchParams; // <- unwrap it
  const q = params?.q || "";

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://fenero-frontend-git-main-les-raes-projects.vercel.app";

  // keep the search request dynamic (no cache)
  const res = await fetch(`${baseUrl}/api/search?q=${q}`, {
    cache: "no-store",
  });
  const results = await res.json();

  return (
    <section className="bg-[#ECF8EF] py-10 select-none">
      <main className="max-w-4xl mx-auto p-6 ">
        <h1 className="text-2xl font-bold">Search results for “{q}”</h1>

        <ul className="mt-6 space-y-4 bg-[#ffffff] shadow-lg rounded-xl p-10">
          {results.map((item) => (
            <li key={item.id} className="border-b border-[#CEEED6] py-4">
              <Link
                href={item.slug}
                className="text-black hover:underline hover:text-[#38BB3F] flex gap-2"
              >
                <IconLink stroke={2} /> {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {!results.length && (
          <p className="mt-6 text-gray-500">No results found.</p>
        )}
      </main>
    </section>
  );
}
