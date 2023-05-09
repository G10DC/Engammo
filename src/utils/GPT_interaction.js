const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

async function queryToGpt(prompt = '') {
    if (prompt.trim().length === 0) {
        throw new Error('Please enter a valid prompt');
    }

    try {
        const completion = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt,
            temperature: 0, //this is the degree of randomness of the model's output
            max_tokens: 500
        });

        return completion.data.choices[0].text.replace(/^\n+/, '');
    }
    catch (e) { console.error(e) }
}

module.exports = { queryToGpt };
