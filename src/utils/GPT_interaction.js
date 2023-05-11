const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

async function queryToGpt(prompt = "", temperature = 0.0, maxTokens = 1000) {
  if (!prompt.trim()) {
    throw new Error("Please enter a valid prompt");
  }

  if (!openai) {
    throw new Error("openai object not found");
  }

  try {
    const {
      data: { choices },
    } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature,
      max_tokens: maxTokens,
    });

    return choices[0].text.trim();
  } catch (e) {
    console.error(e);
  }
}

module.exports = { queryToGpt };
