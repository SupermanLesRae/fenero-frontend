import fetch from "cross-fetch";
import https from "https";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    const response = await fetch("https://13.60.181.6/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      agent,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("GraphQL server error:", text);
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy fetch failed:", err);
    res.status(500).json({ error: "GraphQL fetch failed" });
  }
}
