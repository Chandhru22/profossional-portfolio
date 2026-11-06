export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const endpoint = process.env.GOOGLE_SCRIPT_URL;

  if (!endpoint) {
    return res.status(500).json({
      success: false,
      message: 'Contact service is not configured.',
    });
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(req.body),
      redirect: 'follow',
    });

    const result = await response.json();

    return res.status(response.ok ? 200 : 502).json(result);
  } catch {
    return res.status(502).json({
      success: false,
      message: 'Could not reach the contact service.',
    });
  }
}