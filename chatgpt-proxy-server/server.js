// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Your ChatGPT API Key
const chatGPTApiKey = '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';

// Route to Handle User Input and Generate Fact Boxes
app.post('/generate-fact-boxes', async (req, res) => {
  try {
    // Extract the user input from the request
    const userInput = req.body.userInput;

    // Define the ChatGPT endpoint
    const chatGPTUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    // Define the ChatGPT prompt
    const chatGPTPrompt = `Generate 30 sub-facts about the event: ${userInput}`;

    // Make a POST request to ChatGPT
    const chatGPTResponse = await axios.post(
      chatGPTUrl,
      {
        prompt: chatGPTPrompt,
        max_tokens: 30, // Limit the response to 30 tokens
      },
      {
        headers: {
          Authorization: `Bearer ${chatGPTApiKey}`,
        },
      }
    );

    // Extract and send the sub-facts as a response
    const subFacts = chatGPTResponse.data.choices[0].text;
    res.json({ subFacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating sub-facts.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
