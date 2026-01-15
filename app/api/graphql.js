import https from "https";
import fetch from "cross-fetch";

const agent = new https.Agent({
  rejectUnauthorized: false, // bypass invalid SSL
});

export default async function handler(req, res) {
  try {
    const response = await fetch("https://13.60.181.6/graphql", {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      agent, // Node HTTPS agent
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "GraphQL fetch error" });
  }
}
