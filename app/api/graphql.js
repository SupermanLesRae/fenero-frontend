import fetch from "cross-fetch";
import https from "https";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // For servers without valid SSL
    const agent = new https.Agent({
      rejectUnauthorized: false, // only server-side
    });

    const response = await fetch("https://13.60.181.6/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      agent,
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "GraphQL fetch error" });
  }
}
