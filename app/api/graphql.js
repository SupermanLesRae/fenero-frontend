import fetch from "cross-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" }); // prevent GET requests
  }

  try {
    const response = await fetch("http://13.60.181.6/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add auth headers here if required
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching GraphQL" });
  }
}
