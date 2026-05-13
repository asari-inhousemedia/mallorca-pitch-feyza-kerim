export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: 'API key not configured' });

  const { contents, system_instruction } = req.body;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system_instruction, contents }),
    }
  );

  const data = await response.json();
  res.status(response.status).json(data);
}
