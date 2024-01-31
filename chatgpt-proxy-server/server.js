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
  
      // Extract and return the sub-facts
      const subFacts = chatGPTResponse.data.choices[0].text;
      return subFacts;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while generating sub-facts.');
    }
  };


// Route to Handle User Input and Generate Fact Boxes
app.post('/generate-fact-boxes', async (req, res) => {
    try {
      // Extract the user input from the request
      const userInput = req.body.userInput;

      // Log the user input to the server console
      console.log('Received user input:', userInput);
  
      // Generate sub-facts using ChatGPT
      const subFacts = await generateSubFacts(userInput);

      // Send a response with confirmation and sub-facts
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
