import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // 1. Check for POST request
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // 2. Parse the incoming request body
  const { question, userAnswer, userPersona } = JSON.parse(event.body || "{}");

  if (!question || !userAnswer || !userPersona) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields: question, userAnswer, userPersona" }),
    };
  }
  
  // 3. Get the Gemini API key from environment variables
  const API_KEY = process.env.VITE_GEMINI_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gemini API key is not configured" }),
    };
  }

  try {
    // 4. Initialize the generative AI model
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // 5. Construct the prompt
    const prompt = `
      As an English learning assistant named LingoFit, your task is to provide feedback on a user's answer to a specific question.
      User's Persona: "${userPersona}"
      Question: "${question}"
      User's Answer: "${userAnswer}"

      Please provide feedback in the following JSON format:
      {
        "correction": "A brief, constructive critique of the user's grammar, phrasing, or word choice. Explain why the correction is needed.",
        "formalAnswer": "An improved, more formal or professional version of the user's answer.",
        "nativeAnswer": "A more natural, colloquial, or native-sounding version of the user's answer."
      }

      Focus on being encouraging and helpful.
    `;

    // 6. Generate content with the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedbackText = response.text();

    // 7. Return the structured feedback
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: feedbackText,
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to get feedback from AI" }),
    };
  }
};

export { handler };
