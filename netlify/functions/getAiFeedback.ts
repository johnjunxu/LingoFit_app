import { Handler, HandlerEvent } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { question, userAnswer, userPersona } = JSON.parse(event.body || "{}");
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY || !question || !userAnswer || !userPersona) {
    return { statusCode: 400, body: "Bad Request: Missing required fields or API key." };
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
      return { statusCode: response.status, body: `Gemini API error: ${errorData}` };
    }

    const data = await response.json();
    const feedbackText = data.candidates[0].content.parts[0].text;
    
    // Clean the text to ensure it's a valid JSON string
    const jsonString = feedbackText.replace(/```json\n|```/g, "").trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    };

  } catch (error) {
    console.error("Internal Error:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};

export { handler };
