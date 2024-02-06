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


// Function to generate factboxes using ChatGPT
const generateSubFacts = async (userInput) => {
    try {
      console.log('User Input to send to chatgpt:', userInput); // Add this line to log the user input

      const chatGPTUrl = 'https://api.openai.com/v1/chat/completions';

      // Structure the payload for the ChatGPT API
      const payload = {
        model: "gpt-3.5-turbo", // You can choose the model you prefer
        messages: [
          { role: "system", content: "You are a helpful assistant who writes in clear, concise, and readable language." },
          { role: "user", content: `Generate 30 short hypthetical sub-facts about the hypothetical event: ${userInput}. Imagine that this is a breaking news event, and you are supplying unbiased facts or fictions about the event. They should be presented as facts no more than a few words long.` }
          // { role: "user", content: `Generate 30 words in a list` }
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


// Function to generate narratives using ChatGPT
const generateNarratives = async (userInput, selectedInformation, autoSelectedInformation) => {
  try {
    console.log('User Input to send to ChatGPT:', userInput); // Log user input

    const chatGPTUrl = 'https://api.openai.com/v1/chat/completions';

    // Structure the payload for ChatGPT API with two prompts
    const payload1 = {
      model: 'gpt-3.5-turbo', 
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Generate a short news-like narrative about the following event:\n\nUser Input: ${userInput}\n\nBased on the following selected information:\n1. ${selectedInformation[0]}\n2. ${selectedInformation[1]}\n3. ${selectedInformation[2]}\n4. ${selectedInformation[3]}\n5. ${selectedInformation[4]}\n\nCreate a narrative that leads to a particular conclusion or recommendation regarding the event. Your narrative should consider the implications of the selected information and suggest a course of action or thought. It should be no more than three sentences. ` },
      ],
    };

    const payload2 = {
      model: 'gpt-3.5-turbo', 
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `Generate a news-like narrative about the following event:\n\nUser Input: ${userInput}\n\nBased on the following auto-selected information:\n1. ${autoSelectedInformation[0]}\n2. ${autoSelectedInformation[1]}\n3. ${autoSelectedInformation[2]}\n4. ${autoSelectedInformation[3]}\n5. ${autoSelectedInformation[4]}\n\nCraft a narrative that leads to a different conclusion or recommendation compared to the previous narrative. Consider the implications of the auto-selected information and suggest an alternative course of action or thought. It should be no more than three sentences. ` },
      ],
    };

    // Make POST requests to ChatGPT API with both prompts
    const response1 = await axios.post(chatGPTUrl, payload1, {
      headers: {
        Authorization: `Bearer ${chatGPTApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const response2 = await axios.post(chatGPTUrl, payload2, {
      headers: {
        Authorization: `Bearer ${chatGPTApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract and return the generated narratives
    const narrative1 = response1.data.choices[0].message.content; // Adjust based on the actual response structure
    const narrative2 = response2.data.choices[0].message.content; // Adjust based on the actual response structure

    console.log('Generated Narrative 1:', narrative1); // Log the first narrative
    console.log('Generated Narrative 2:', narrative2); // Log the second narrative

    return { narrative1, narrative2 };
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while generating narratives.');
  }
};

// Route to Handle Generating Narratives
app.post('/generate-narratives', async (req, res) => {
  try {
    const { userInput, selectedInformation, autoSelectedInformation } = req.body;
    console.log('Received user input:', userInput);

    const { narrative1, narrative2 } = await generateNarratives(userInput, selectedInformation, autoSelectedInformation);

    res.json({ message: 'Narratives generated successfully.', narrative1, narrative2 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating narratives.' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
