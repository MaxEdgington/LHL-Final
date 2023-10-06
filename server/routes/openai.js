const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("OpenAI route is working!");
});

router.post("/", async (req, res) => {
  try {
    const { description } = req.body;

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Using the below description create an array of objects, at least 25, with the following keys: 
                - taskTitle: The title of the task to be completed   
                - taskDescription: The description of the task to be completed 
      
                The tasks should be generic so that they can apply to javascript or typescript and should assume a SQL based database. 
                The tasks should be web development Kanban tasks associated with the following description:
                ${description}`,
      },
    ];

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // If "gpt-4.0-turbo" is available, else use "gpt-4"
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data.choices[0].message.content;
    res.json({ generatedText });
  } catch (error) {
    console.error("Error with OpenAI API call:", error.message); // <-- This will log detailed error message.
    if (error.response) {
      console.error("OpenAI API Response:", error.response.data); // If axios error, this will log the API's response.
    }
    res.status(500).json({ error: "Failed to generate tasks using OpenAI." });
  }
});

module.exports = router;
