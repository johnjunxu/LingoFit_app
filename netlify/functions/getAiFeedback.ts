import { Handler, HandlerEvent } from "@netlify/functions";
import { HttpsProxyAgent } from "https-proxy-agent";

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { question, userAnswer, userPersona } = JSON.parse(event.body || "{}");
  const API_KEY = process.env.GEMINI_API_KEY;
  const PROXY_URL = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

  if (!API_KEY) {
    return { statusCode: 500, body: "Server configuration error: API key not found." };
  }
  if (!question || !userAnswer || !userPersona) {
    return { statusCode: 400, body: "Bad Request: Missing required fields." };
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
  
  const prompt = `
    As an English learning assistant named LingoFit, provide feedback for the following in valid JSON format only:
    User Persona: "${userPersona}"
    Question: "${question}"
    User's Answer: "${userAnswer}"
    JSON format: { "correction": "...", "formalAnswer": "...", "nativeAnswer": "..." }
  `;

  // Use a proxy agent if the PROXY_URL is set
  const agent = PROXY_URL ? new HttpsProxyAgent(PROXY_URL) : undefined;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
      // @ts-ignore - The `dispatcher` type is not perfectly aligned but works
      dispatcher: agent,
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error:", errorData);
      return { statusCode: response.status, body: `Gemini API error: ${errorData}` };
    }

    const data = await response.json();
    const feedbackText = data.candidates[0].content.parts[0].text;
    
    const jsonString = feedbackText.replace(/```json\n|```/g, "").trim();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: jsonString,
    };

  } catch (error: any) {
    console.error("Internal Error:", error);
    return { statusCode: 500, body: `Internal Server Error: ${error.message}` };
  }
};

export { handler };
