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
    let payload = req.body;

    // Convert request body into a JavaScript object.
    if (typeof payload === 'string') {
      payload = JSON.parse(payload);
    }

    if (
      !payload ||
      typeof payload !== 'object' ||
      Array.isArray(payload)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request format.',
      });
    }

    console.log('Contact payload fields:', Object.keys(payload));

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const result = await response.json();

    return res.status(200).json(result);

  } catch (error) {
    console.error('Contact API error:', error);

    return res.status(502).json({
      success: false,
      message: 'Could not process your message.',
    });
  }
}