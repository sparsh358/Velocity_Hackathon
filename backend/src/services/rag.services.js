const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateExplanation(context) {
  try {
    if (!process.env.GEMINI_API_KEY) return null;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a relocation intelligence assistant.

Based on the following country data, explain in 3-4 sentences why this country received its ranking.

${context}

Keep it analytical and professional.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini error:", error.message || error);
    return null;
  }
}

module.exports = { generateExplanation };