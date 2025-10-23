export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Received webhook from GHL:', req.body);

    // Step 1: Get access token from ServiceTitan
    const tokenResponse = await fetch('https://auth-integration.servicetitan.io/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&client_id=cid.0vjruwfy5yhdmgotpo4x1xftz&client_secret=cs4.b0p3w9ye47jmwe8jsxg653e2qxru7azo06bs252m2v47czf0px'
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get ServiceTitan token');
    }

    const tokenData = await tokenResponse.json();
    console.log('Got ServiceTitan token');

    // Step 2: Get GHL webhook data
    const ghlData = req.body;

    // Step 3: For now, just return success (we'll add ServiceTitan job creation later)
    return res.status(200).json({ 
      success: true, 
      message: 'Webhook received successfully',
      ghlData: ghlData,
      note: 'ServiceTitan job creation coming next'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
