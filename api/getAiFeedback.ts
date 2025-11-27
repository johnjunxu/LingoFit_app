import { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { question, userAnswer, userPersona } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY || !question || !userAnswer || !userPersona) {
    return res.status(400).send("Bad Request: Missing required fields or API key.");
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
  
  const prompt = `
    As an English learning assistant named LingoFit, provide feedback for the following in valid JSON format only:
    User Persona: "${userPersona}"
    Question: "${question}"
    User's Answer: "${userAnswer}"
    JSON format: { "correction": "...", "formalAnswer": "...", "nativeAnswer": "..." }
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error:", errorData);
      return res.status(response.status).send(`Gemini API error: ${errorData}`);
    }

    const data = await response.json();
    const feedbackText = data.candidates[0].content.parts[0].text;
    
    const jsonString = feedbackText.replace(/```json\n|```/g, "").trim();

    res.status(200).setHeader("Content-Type", "application/json").send(jsonString);

  } catch (error: any) {
    console.error("Internal Error:", error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};

export default handler;
