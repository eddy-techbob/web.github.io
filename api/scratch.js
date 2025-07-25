export default async (req, res) => {
  const { path = "", method = "GET", headers = {}, body } = req.body;

  const scratchApiUrl = `https://api.scratch.mit.edu/${path}`;

  try {
    const response = await fetch(scratchApiUrl, {
      method,
      headers,
      body: method !== "GET" ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
