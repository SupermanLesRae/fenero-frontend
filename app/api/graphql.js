import fetch from "cross-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://13.60.181.6/graphql", {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        // Add auth headers here if needed
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching GraphQL" });
  }
}
