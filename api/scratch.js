export default async function handler(req, res) {
  // Extract the path and query from the request
  const { method, url } = req;
const apiPath = url.replace(/^\/api/, '');
  //https://api.scratch.mit.edu/projects/1159822855

  // Build the target Scratch API URL
  const scratchApiUrl = `https://api.scratch.mit.edu${apiPath}`;

  // Forward the request to Scratch API
  const apiRes = await fetch(scratchApiUrl, {
    method,
    headers: {
      ...req.headers,
      host: 'api.scratch.mit.edu'
    }
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Set the returned headers and status
  res.status(apiRes.status);
  apiRes.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  // Pipe the API response to the client
  const data = await apiRes.text();
  res.send(data);
  console.log(data);
}
