// api/proxy.js
export default async (req, res) => {
  const { url, method = "GET", headers = {}, body } = req.body;

  try {
    const response = await fetch(url, {
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
