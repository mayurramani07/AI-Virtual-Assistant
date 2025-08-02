const axios = require("axios");

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;
    const apiKey = process.env.GEMINI_API_KEY;

    const prompt = `You are a virtual assistant named ${assistantName}, created by ${userName}.  
You are not Google. You must now act like a voice-enabled assistant.

Your task is to interpret the user's natural language input and return a JSON object in the following format:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" |
           "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" |
           "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<original user input, without your name if mentioned. If it's a Google or YouTube search, include only the search query>",
  "response": "<a short, spoken-friendly reply for the user>"
}

Instructions:
- "type": Identify the user's intent based on their input.
- "userInput": Include the original user input. If your name is mentioned, remove it. If it's a Google or YouTube search request, only include the search query.
- "response": A short, natural-sounding response suitable for voice output. Examples: "Sure, opening it now", "Here’s what I found", "It’s 5 PM", "Today is Monday".

Explanation of "type":
- "general": For general questions or factual answers.
- "google-search": When the user wants to search something on Google.
- "youtube-search": When the user wants to search something on YouTube.
- "youtube-play": When the user wants to directly play a video, song, or content on YouTube.
- "calculator-open": When the user asks to open a calculator.
- "instagram-open": When the user asks to open Instagram.
- "facebook-open": When the user asks to open Facebook.
- "weather-show": When the user wants weather information.
- "get-time": When the user asks for the current time.
- "get-date": When the user asks for today’s date.
- "get-day": When the user asks what day it is today.
- "get-month": When the user asks for the current month.

Additional Notes:
- If the user asks who created you, respond with "${userName}" as the creator.
- Your entire response must be only the final JSON object. Do not include any explanations, formatting, or additional text.

Now your user input: ${command}
`;

    const result = await axios.post(
      `${apiUrl}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    let responseText =
      result?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;

    // ✅ Fix: Remove code block wrappers (e.g. ```json ... ```)
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```(?:json)?/gi, "").replace(/```$/, "").trim();
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    return null;
  }
};

module.exports = geminiResponse;
