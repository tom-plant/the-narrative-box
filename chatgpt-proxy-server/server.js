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


// Function to generate sub-facts using ChatGPT
const generateSubFacts = async (userInput) => {
    try {
      const chatGPTUrl = 'https://api.openai.com/v1/chat/completions';

      // Structure the payload for the ChatGPT API
      const payload = {
        model: "gpt-3.5-turbo", // You can choose the model you prefer
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Generate 30 sub-facts about the event: ${userInput}` }
        ],
      };

      const chatGPTResponse = await axios.post(chatGPTUrl, payload, {
        headers: {
          Authorization: `Bearer ${chatGPTApiKey}`,
          'Content-Type': 'application/json'
        },
      });

      // Extract and return the generated sub-facts
      const subFacts = chatGPTResponse.data.choices[0].message.content; // Adjust based on the actual response structure
      return subFacts;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while generating sub-facts.');
    }
};



// Route to Handle User Input and Generate Fact Boxes
app.post('/generate-fact-boxes', async (req, res) => {
    try {
      const userInput = req.body.userInput;
      console.log('Received user input:', userInput);

      const subFacts = await generateSubFacts(userInput);
      res.json({ message: 'User input received successfully.', subFacts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating sub-facts.' });
    }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
