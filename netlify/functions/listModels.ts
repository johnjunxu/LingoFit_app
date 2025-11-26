import { Handler, HandlerEvent } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent) => {
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return { statusCode: 500, body: "GEMINI_API_KEY is not configured." };
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      console.error("Error listing models:", data);
      return { statusCode: response.status, body: JSON.stringify(data) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.models, null, 2),
    };

  } catch (error) {
    console.error("Internal Error:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};

export { handler };
